import * as fs from 'fs';
import { promisify } from 'util';

export interface ArduinoCodeModificationParams {
    originalFilePath: string;
    jsonFilePath: string;
}

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export async function modifyArduinoCodeWithImages(params: ArduinoCodeModificationParams) {
    try {
        const { originalFilePath, jsonFilePath } = params;

        // Read the original Arduino code file
        const originalCode = await readFileAsync(originalFilePath, 'utf-8');

        // Read the new content for IMAGES from the JSON file
        const jsonData = JSON.parse(await readFileAsync(jsonFilePath, 'utf-8'));
        const newImages = jsonData.array;

        if (!Array.isArray(newImages)) {
            throw new Error('Invalid JSON format: "array" property is missing or not an array.');
        }

        // Find the start position of IMAGES in the code
        const startIndex = originalCode.indexOf('byte IMAGES[][8]{') + "byte IMAGES[][8]{".length;

        // Find the end position of IMAGES in the code
        const endIndex = originalCode.indexOf('};', startIndex);

        // Construct the modified code by replacing the IMAGES content
        const modifiedCode =
            originalCode.substring(0, startIndex) +
            convertImagesContent(newImages) +
            originalCode.substring(endIndex);

        // Helper function to convert the IMAGES content to Arduino-compatible format
        function convertImagesContent(images: number[][]): string {
            return images
                .map((image) => {
                    const imageContent = image.map((value) => `B${value.toString(2).padStart(8, '0')}`).join(', ');
                    return `{ ${imageContent} }`;
                })
                .join(',\n');
        }

        // Overwrite the original Arduino code file with the modified code
        await writeFileAsync(originalFilePath, modifiedCode);

        console.log('Arduino code modified successfully.');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        } else {
            console.error('An unknown error occurred.');
        }
        throw error;
    }
}
