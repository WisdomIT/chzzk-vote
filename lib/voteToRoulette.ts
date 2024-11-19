export default function voteToRoulette(data: { name: string; size: number }[]) {
  if (data.length > 20) {
    if (
      !confirm(
        `룰렛으로의 결과 이전은 최대 20개 항목까지만 가능합니다.\n20위 이하 항목은 제외하고 이전하실래요?\n(취소하면 기존 화면이 유지됩니다)`
      )
    )
      return;
  }
  const filtered = data.filter((item) => item.size !== 0);
  const sliced = filtered.slice(0, 19);
  const mapped = sliced.map((item) => ({
    name: item.name.length > 20 ? `${item.name.slice(19)}...` : item.name,
    size: item.size,
  }));

  const encoded = encodeURIComponent(JSON.stringify(mapped));

  return `/roulette?data=${encoded}`;
}
