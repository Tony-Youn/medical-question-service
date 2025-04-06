import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "문진표 제출 완료",
  description: "치과 문진표 제출이 완료되었습니다.",
};

export default function SubmitCompletePage() {
  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-xl px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              문진표 제출 완료
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-12 h-12 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-4">
                문진표가 성공적으로 제출되었습니다.
              </h2>
              <p className="text-gray-600 mb-2">
                귀하의 정보가 안전하게 저장되었습니다.
              </p>
              <p className="text-gray-600">
                필요한 경우 치과 방문 시 추가 정보를 요청할 수 있습니다.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
