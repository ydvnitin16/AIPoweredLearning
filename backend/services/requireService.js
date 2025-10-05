import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';

export async function requireUser(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
}

export async function requireSubject(subjectId) {
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    const err = new Error('Subject not found');
    err.status = 404;
    throw err;
  }
  return subject;
}

export async function requireTopic(id) {
  const topic = await Topic.findById(id);
  if (!topic) {
    const err = new Error('Topic not found');
    err.status = 404;
    throw err;
  }
  return topic;
}