import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="container mx-auto py-16">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">감사합니다!</CardTitle>
            <CardDescription>
              문진표가 성공적으로 제출되었습니다.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="mb-4">
              귀하의 정보는 안전하게 저장되었으며, 의료 서비스 제공을 위해
              사용됩니다.
            </p>
            <p>추가 질문이나 문의 사항이 있으시면 저희에게 연락해 주세요.</p>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
