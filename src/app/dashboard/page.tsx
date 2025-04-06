import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define a Profile interface
interface Profile {
  id: string;
  name: string;
  created_at: string;
  [key: string]: any; // For any additional properties
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in, redirect to login page
  if (!user) {
    redirect("/login");
  }

  // Get user profiles data
  const { data: profiles } = await supabase.from("profiles").select();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">사용자 정보</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
          <p>
            <strong>사용자 ID:</strong> {user.id}
          </p>
          <p>
            <strong>마지막 로그인:</strong>{" "}
            {new Date(user.last_sign_in_at || "").toLocaleString("ko-KR")}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          등록된 프로필 {profiles?.length || 0}개
        </h2>
        <div className="bg-white shadow rounded-lg p-6">
          {profiles && profiles.length > 0 ? (
            <ul className="divide-y">
              {profiles.map((profile: Profile) => (
                <li key={profile.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-gray-500">
                        등록일:{" "}
                        {new Date(profile.created_at).toLocaleDateString(
                          "ko-KR"
                        )}
                      </p>
                    </div>
                    <div>
                      <Link href={`/dashboard/profiles/${profile.id}`}>
                        <Button size="sm" variant="outline">
                          상세정보
                        </Button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>등록된 프로필이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link href="/questionnaire">
          <Button>새 문진표 작성하기</Button>
        </Link>
      </div>
    </div>
  );
}
