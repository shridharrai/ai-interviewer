import { db } from "@/firebase/admin";

// api/get-feedback/
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const interviewId = searchParams.get("interviewId");

  if (!interviewId) {
    return Response.json(
      { success: false, message: "Missing interviewId" },
      { status: 400 }
    );
  }

  try {
    const feedbackQuery = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .limit(1)
      .get();

    if (feedbackQuery.empty) {
      return Response.json(
        { success: false, message: "No feedback found" },
        { status: 404 }
      );
    }

    const doc = feedbackQuery.docs[0];
    return Response.json({
      success: true,
      feedback: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
