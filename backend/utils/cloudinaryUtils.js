import { v2 as cloudinary } from "cloudinary";

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image: ${publicId}`);
    } catch (err) {
        console.error(`Failed to delete image ${publicId}:`, err.message);
    }
};

export function attachImagesToOutput(output, files) {
    let fileIdx = 0;
    output.content = output.content.map((block) => {
        if (
            block.type === 'image' &&
            block.data?.placeholder &&
            files[fileIdx]
        ) {
            block.data = {
                url: files[fileIdx].path,
                publicId: files[fileIdx].filename,
            };
            fileIdx++;
        }
        return block;
    });
    return output;
}