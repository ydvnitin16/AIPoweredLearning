import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import Progress from '../models/progressModel.js';
import { checkOwnerShip, isValidObjectId, validateTitle } from '../utils/validationUtils.js';
import { requireSubject, requireUser } from '../services/requireService.js';
import { handleError, throwError } from '../utils/helper.js';
import { deleteImageFromCloudinary } from '../utils/cloudinaryUtils.js';

const createSubject = async (req, res) => {
    const { title } = req.body;
    const { id } = req.user;

    try {
        const user = await requireUser(id);

        const subject = await Subject({
            title: title.trim(),
            createdBy: req.user.id,
            suggestedTopics: req?.suggestedTopics,
        });

        const createdSubject = await subject.save();
        user.subjects.push(createdSubject._id);
        await user.save();

        res.status(201).json({
            message: 'Subject created successfully.',
            subject: createdSubject,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const updateSubject = async (req, res) => {
    const { subjectId } = req.body;
    const { id } = req.user;

    try {
        if (!isValidObjectId(subjectId)) throwError('Invalid subject id', 400);

        const user = await requireUser(id);
        const subject = await requireSubject(subjectId);

        checkOwnerShip(user._id.valueOf(), subject.createdBy.valueOf())

        subject.suggestedTopics = req.suggestedTopics;
        await subject.save();

        res.status(201).json({
            message: 'Suggestions generated successfully.',
            subject: subject,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const getImportedSubjects = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await requireUser(id);

        const importedSubjects = await Subject.find({
            _id: { $in: user.importedSubjects },
        })
            .select('-suggestedTopics -isPublic')
            .populate({
                path: 'createdBy',
                select: 'email name -_id',
            });
        res.status(200).json({
            message: 'Fetched successfully.',
            importedSubjects: importedSubjects || [],
        });
    } catch (err) {
        handleError(res, err);
    }
};

const getSubjects = async (req, res) => {
    const { id } = req.user;
    try {
        const subjects = await Subject.find({
            createdBy: id,
        });

        const subjectIds = subjects.map((sub) => sub._id);

        // all topics of each subject
        const topics = await Topic.find({ subjectId: { $in: subjectIds } });

        const totalTopicsMap = {};

        // count of topics for each subject
        topics.forEach((topic) => {
            const subId = topic.subjectId.valueOf();
            totalTopicsMap[subId] = (totalTopicsMap[subId] || 0) + 1;
        });

        // fetch done topics
        const progressRecords = await Progress.find({
            userId: req.user.id,
            subjectId: { $in: subjectIds },
            isDone: true,
        });

        const doneTopicsMap = {};

        // count of done topics for each subject
        progressRecords.forEach((record) => {
            const subId = record.subjectId.toString();
            doneTopicsMap[subId] = (doneTopicsMap[subId] || 0) + 1;
        });

        const subjectWithProgress = subjects.map((subject) => {
            const subId = subject._id.valueOf();
            const totalTopics = totalTopicsMap[subId] || 0;
            const doneTopics = doneTopicsMap[subId] || 0;
            let progress = 0;
            if (totalTopics > 0) {
                progress = Math.round((doneTopics / totalTopics) * 100);
            }
            return {
                _id: subject._id,
                title: subject.title,
                isPublic: subject.isPublic,
                likes: subject.likes,
                createdBy: subject.createdBy,
                suggestedTopics: subject.suggestedTopics,
                totalTopics: totalTopics,
                doneTopics: doneTopics,
                progress: progress,
            };
        });

        res.status(200).json({
            message: 'Fetched your subjects successfully.',
            subjects: subjectWithProgress || [],
        });
    } catch (err) {
        handleError(res, err)
    }
};

const getPublicSubjects = async (req, res) => {
    try {
        const publicSubjects = await Subject.find({ isPublic: true })
            .select('-suggestedTopics -isPublic')
            .populate({
                path: 'createdBy',
                select: 'email name -_id',
            });
        res.status(200).json({
            message: 'Public subjects fetched successfully.',
            publicSubjects: publicSubjects || [],
        });
    } catch (err) {
        handleError(res, err)
    }
};

const updateIsPublicStatus = async (req, res) => {
    const { subjectId, isPublic } = req.body;

    try {
        if (!isValidObjectId(subjectId)) throwError('Invalid subject id', 400);

        if (typeof isPublic !== 'boolean')
            throwError('isPublic must be Boolean', 400);

        const subject = await requireSubject(subjectId);

        if (subject.createdBy.valueOf() !== req.user.id) {
            throwError('You are not allowed to update this subject', 403);
        }
        subject.isPublic = isPublic;
        const updatedSubject = await subject.save();
        res.status(200).json({
            message: `Subject set to ${isPublic ? 'Public' : 'private'}`,
            subject: updatedSubject,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const importSubject = async (req, res) => {
    const { id } = req.body;

    try {
        if (!isValidObjectId(id)) {
            throwError('Invalid subject id', 400);
        }
        const originalSubject = await requireSubject(id);
        const user = await requireUser(req.user.id); // check is user exists

        if (originalSubject.createdBy.valueOf() === req.user.id)
            throwError(`You can't import your own document`, 403);

        if (user.importedSubjects.includes(originalSubject._id))
            throwError('Subject already imported.', 400);

        user.importedSubjects.push(originalSubject._id);

        await user.save();
        return res.status(200).json({
            message: `Subject imported successfully: ${originalSubject.title}`,
            importedSubjectId: originalSubject._id,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const deleteSubject = async (req, res) => {
    const { subjectId } = req.body;
    try {
        if (!isValidObjectId(subjectId)) throwError('Invalid subject id');

        const subject = await requireSubject(subjectId);
        const user = await requireUser(req.user.id);
        checkOwnerShip(subject.createdBy.toString(), req.user.id)

        // --- Remove subject reference from user ---
        user.subjects = user.subjects.filter(
            (id) => id.toString() !== subjectId
        );
        await user.save();

        // get all topics of that subject to delete
        const topics = await Topic.find({ subjectId });
        const topicIds = topics.map((t) => t._id);

        // Delete cloudinary images
        for (const topic of topics) {
            if (topic.output?.content && Array.isArray(topic.output.content)) {
                for (const block of topic.output.content) {
                    if (block.type === 'image' && block.data?.publicId) {
                        await deleteImageFromCloudinary(block.data.publicId)
                    }
                }
            }
        }
        // delete progress of that subject
        const progressResult = await Progress.deleteMany({
            subjectId,
            topicId: { $in: topicIds },
        });

        // delete subject and its topics
        const topicResult = await Topic.deleteMany({ subjectId });
        await Subject.findByIdAndDelete(subjectId);

        res.status(200).json({
            message: `Subject deleted. ${
                topicResult.deletedCount
                    ? `${topicResult.deletedCount} topics,`
                    : ''
            } ${
                progressResult.deletedCount
                    ? `${progressResult.deletedCount} progress records,`
                    : ''
            } related images removed successfully.`,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const deleteImportedSubject = async (req, res) => {
    const { subjectId } = req.body;
    try {
        if (!isValidObjectId(subjectId)) throwError('Invalid subject id');
  
        const user = await requireUser(req.user.id);

        user.importedSubjects = user.importedSubjects.filter(
            (s) => s.toString() !== subjectId
        );
        await user.save();

        res.status(200).json({
            message: `Subject deleted.`,
        });
    } catch (err) {
        handleError(res, err);
    }
};

export {
    createSubject,
    getSubjects,
    getPublicSubjects,
    updateIsPublicStatus,
    importSubject,
    getImportedSubjects,
    deleteSubject,
    updateSubject,
    deleteImportedSubject,
};
