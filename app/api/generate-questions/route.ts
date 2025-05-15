import { generateText } from "ai";
import { google } from "@ai-sdk/google";

// api/generate-questions
export async function POST(request: Request) {
  const { type, role, level, techstack, amount } = await request.json();

  // Join techstack array into comma-separated string
  const techstackStr = Array.isArray(techstack)
    ? techstack.join(", ")
    : techstack;

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
          The job role is ${role}.
          The job experience level is ${level}.
          The tech stack used in the job is: ${techstackStr}.
          The focus between behavioural and technical questions should lean towards: ${type}.
          The amount of questions required is: ${amount}.
          Please return only the questions, without any additional text.
          The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
          Return the questions formatted like this:
          ["Question 1", "Question 2", "Question 3"]
          
          Thank you! <3
        `,
    });

    return Response.json(
      { success: true, questions: JSON.parse(questions) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating questions:", error);
    return Response.json(
      { success: false, error: (error as any).message || error },
      { status: 500 }
    );
  }
}
