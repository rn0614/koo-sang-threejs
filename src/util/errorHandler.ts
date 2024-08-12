export function handleError( message:string, statusCode = 500) {
  console.error(message); // 콘솔에 에러 메시지 기록
  return new Response(JSON.stringify({ error: message }), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}