"use server";

import { LogoModels } from "@/Constants";
import { FormData } from "@/types";
import { GoogleGenAI } from "@google/genai";
import ImageKit from "imagekit";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function IdeasGenerator(data: FormData) {
  const prompt = `You are a professional logo designer. Based on Logo of type ${
    data.model
  } Generate a text prompt to create Logo for Logo title/Brand name : ${
    data.title
  } 
  with decription: ${data.desc} and refering to prompt: ${
    LogoModels.find((model) => model.title === data.model)?.prompt
  }. Give me 4/5 Suggestion of logo idea 
  (each idea with maximum 4-5 words), Return ONLY ONE valid JSON object in this exact format (no extra text, no markdown, no explanations):  
  "logoGenerationPrompt": "string",
  "logoIdeas": ["string", "string", "string", "string", "string"]
}.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return { status: "success", data: response.text };
}

export const LogoGenerator = async (formData: FormData) => {
  let base64Img: Buffer | null = null;

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_ENDPOINT!,
  });

  try {

    const promptRes = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a text prompt to create a Logo for brand name: ${formData.title}, 
        with description: ${formData.desc}, 
        color combination of ${formData.palette}, 
        also include the idea: ${formData.idea}, 
        and design style: ${formData.model}. 
        Refer to this Logo Prompt: ${formData.prompt}.
        Return JSON with only a "prompt" field.`,
    });

    const textPrompt = promptRes.text;
    if (!textPrompt) {
      throw new Error("No prompt returned from AI");
    }


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: textPrompt,
    });

    if (!response?.candidates?.[0]?.content?.parts) {
      throw new Error("No image data returned from AI response");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        base64Img = Buffer.from(part.inlineData.data, "base64");
      }
    }

    if (!base64Img) {
      throw new Error("Failed to decode image data");
    }

    const file = await imagekit.upload({
      file: base64Img,
      fileName: `logo_${Date.now()}.png`,
      folder: "/logos",
    });

    return { status: "success", image: file.url };
  } catch (error: any) {
    console.error("LogoGenerator error:", error);
    return { status: "error", message: error.message || "Logo generation failed" };
  }
};

