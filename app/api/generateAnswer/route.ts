import OpenAI from "openai";
import { NextResponse } from "next/server";


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const prompt = process.env.OPENAI_PROMPT || "Respondé de manera breve.";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: question },
        ],
    });
    return NextResponse.json({ answer: completion.choices[0].message.content });
} catch (error) {
    return NextResponse.json({ error: error as Error }, { status: 500 });
}
}