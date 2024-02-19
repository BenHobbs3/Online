import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

function main() {    
    const geminiPrompt = `Pretend to be the Pokedex like from the Pokemon anime. 
    Please give me a brief description of the Pokemon in the image starting with the name of it 
    followed by 'The (type) pokemon' and then a short description. 
    If it doesn't register as a pokemon to you, say 'Not Registered'`;

    const result = geminiCall(geminiPrompt);

    console.log(result);
}

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
}

async function geminiCall(prompt)
{
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision"});

    const images = [
        fileToGenerativePart("/Users/benjaminhobbs/Documents/Coding/Online/src/photos/palworld.jpeg", "image/jpeg")
    ];

    const result = await model.generateContent([prompt, images]);
    const response = await result.response;
    const text = response.text();

    console.log(text);
}
main();
