import { uploadVideo } from "@/api/video/api";
import { CHUNK_SIZE } from "@/constants";

export async function uploadChunkedFile(file: File) {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        const start = chunkNumber * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber.toString());
        formData.append("totalChunks", totalChunks.toString());
        formData.append("fileName", file.name);

        try {
            const response = await uploadVideo({
                formData, // Pass the FormData object
            });

            console.log(
                `Chunk ${chunkNumber + 1}/${totalChunks} uploaded:`,
                response.data
            );
        } catch (error) {
            console.error(`Error uploading chunk ${chunkNumber + 1}:`, error);
            throw error;
        }
    }

    console.log("All chunks uploaded successfully");
}
