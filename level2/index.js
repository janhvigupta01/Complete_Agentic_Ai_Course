
import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {ChatGoogle} from "@langchain/google";
import {ChatGroq} from "@langchain/groq";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    const model=new ChatGoogle("gemini-3-flash-preview")
    const result=await model.invoke(prompt)
    return res.json(result.text)
})

// ai agent = llm + tools


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
