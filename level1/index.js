
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {ChatGoogle} from "@langchain/google";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());



// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     httpOptions: {
//         apiVersion: "v1beta"
//     }
// });
// app.post("/chat", async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         if (!prompt) {
//             return res.status(400).json({
//                 error: "Prompt is required"
//             });
//         }

//         const result = await ai.models.generateContent({
//             model: "gemini-3-flash-preview",
//             contents: prompt
//         });

//         return res.json({
//             response: result.text
//         });

//     } catch (error) {
//         console.log("Error:", error.message);

//         return res.status(error.status || 500).json({
//             error: error.message
//         });
//     }
// });


//Langchain

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    const ai = new ChatGoogle({
        model: "gemini-3-flash-preview",
        temperature: 0.7,
        maxOutputTokens: 1000,
    })
    const result=await ai.invoke(prompt)
    return res.json(result.content)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
