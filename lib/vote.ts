export function extractVoteNumber(input: string) {
  // '!투표'로 시작하는지 확인
  if (!input.startsWith("!투표")) {
    return null;
  }

  // 정규표현식을 사용하여 '!투표' 뒤의 숫자를 추출
  const match = input.match(/^!투표\s*(\d+)/);

  // 매칭되는 숫자가 있으면 숫자를 반환, 없으면 null 반환
  return match ? parseInt(match[1]) : null;
}
