import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    const supabase = await createClient();

    await supabase.auth.signOut();

    // Revalidate the home page and layout
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
