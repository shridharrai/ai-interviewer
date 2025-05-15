import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

// api/create-interview/
export async function POST(request: Request) {
  const { role, type, level, techstack, questions, userid, jobid } =
    await request.json();

  try {
    const interviewData = {
      role,
      type,
      level,
      techstack: techstack,
      questions,
      userId: userid,
      jobId: jobid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interviewData);
    const interview = { id: docRef.id, ...interviewData };

    return Response.json({ success: true, interview }, { status: 200 });
  } catch (error) {
    console.error("Error creating interview:", error);
    return Response.json(
      { success: false, error: (error as any).message || error },
      { status: 500 }
    );
  }
}
