import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
          치아 건강 문진 서비스
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          더 나은 진료를 위해 사전 문진을 작성해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/questionnaire">
            <Button size="lg" className="px-8">
              문진표 작성하기
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="px-8">
              서비스 소개
            </Button>
          </Link>
        </div>
        <div className="mt-16 text-sm text-gray-500">
          <p>
            모든 정보는 안전하게 암호화되어 저장되며, 의료 서비스 제공
            목적으로만 사용됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
