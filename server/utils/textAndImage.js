import { GoogleGenerativeAI } from "@google/generative-ai";

import { aiConfig } from "../config/aiConfig.js";
import { processImages } from "./processImages.js";

const genAI = new GoogleGenerativeAI(aiConfig.gemini.apiKey);

// support image url or image file path
export const textAndImage = async (prompt, images) => {
  const model = genAI.getGenerativeModel({
    model: aiConfig.gemini.textAndImageModel,
    safetySettings: aiConfig.gemini.safetySettings,
  });

  // prompt is a single string
  // imageParts is an array containing base64 strings of images
  let imageParts = [];
  const obj = images[0];
  if (typeof obj === 'string' && obj.indexOf('http') === 0) {
    imageParts = await processImages(images);
  } else {
    imageParts = images.map((image) => {
      const type = image.type
      return { 
        inlineData: {
          data: image.data,
          type
        }
      };
    });
  }

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const chatResponse = result?.response?.text();

    return { result: chatResponse };
  } catch (error) {
    console.error("textAndImage | error", error);
    return { Error: "Uh oh! Caught error while fetching AI response" };
  }
};
