export const TIMEZONE = "Asia/Seoul";

export function formatDateToKST(date: Date): string {
  return date.toLocaleString("ko-KR", { timeZone: TIMEZONE });
}

export function getCurrentKSTDate(): Date {
  const now = new Date();
  const koreaTime = new Date(
    now.toLocaleString("en-US", { timeZone: TIMEZONE })
  );
  return koreaTime;
}
