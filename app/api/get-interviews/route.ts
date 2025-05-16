import { db } from "@/firebase/admin";

// GET /api/get-interviews?jobId=abc123&userId=user456
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");
  const userId = searchParams.get("userId");

  if (!jobId || !userId) {
    return Response.json(
      { success: false, error: "Missing jobId or userId." },
      { status: 400 }
    );
  }

  try {
    const snapshot = await db
      .collection("interviews")
      .where("jobId", "==", jobId)
      .where("userId", "==", userId)
      .get();

    const interviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return Response.json({ success: true, interviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return Response.json(
      {
        success: false,
        error: (error as any).message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
