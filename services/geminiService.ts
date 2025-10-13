
import { GoogleGenAI, Modality } from "@google/genai";
import { VIEWS_CONFIG } from '../constants';
import { GeneratedImage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = ai.models['gemini-2.5-flash-image'];

export const generateSixViews = async (base64Image: string, mimeType: string): Promise<GeneratedImage[]> => {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const generationPromises = VIEWS_CONFIG.map(async (viewConfig) => {
    try {
      const textPart = { text: viewConfig.prompt };
      
      const response = await model.generateContent({
          contents: { parts: [imagePart, textPart] },
          config: {
              responseModalities: [Modality.IMAGE, Modality.TEXT],
          },
      });

      const responseImagePart = response.candidates?.[0]?.content?.parts.find(
        (part) => part.inlineData
      );

      if (responseImagePart && responseImagePart.inlineData) {
        const generatedBase64 = responseImagePart.inlineData.data;
        const generatedMimeType = responseImagePart.inlineData.mimeType;
        return {
          view: viewConfig.type,
          src: `data:${generatedMimeType};base64,${generatedBase64}`,
        };
      } else {
        throw new Error(`Image data not found in response for ${viewConfig.type} view.`);
      }
    } catch (error) {
      console.error(`Failed to generate ${viewConfig.type} view:`, error);
      return {
        view: viewConfig.type,
        src: null, // Indicate failure for this specific view
      };
    }
  });

  return Promise.all(generationPromises);
};
