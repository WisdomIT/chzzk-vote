import { Container, Btn, BtnIcon, BtnText, BtnTooltip } from "./page.styled";
import {
  faCheckToSlot,
  faCheeseSwiss,
  faSlotMachine,
  faUsers,
} from "@awesome.me/kit-8710ef4103/icons/sharp/light";

export default function Page() {
  const btns = [
    {
      href: "/viewer",
      icon: faUsers,
      text: "시청자 추첨",
      tooltip: `랜덤한 시청자를\n추첨을 통해 뽑습니다`,
    },
    {
      href: "/vote",
      icon: faCheckToSlot,
      text: "숫자 투표",
      tooltip: `항목을 정해두고\n시청자들이 채팅으로 투표합니다`,
    },
    {
      href: "/donation",
      icon: faCheeseSwiss,
      text: "도네 투표",
      tooltip: `항목을 정해두고\n시청자들이 도네로 투표합니다`,
    },
    {
      href: "/roulette",
      icon: faSlotMachine,
      text: "룰렛",
      tooltip: `항목을 정해두고\n그 중 하나를 룰렛으로 뽑습니다`,
    },
  ];

  return (
    <>
      <Container>
        {btns.map((item) => (
          <Btn key={item.href} href={item.href}>
            <BtnIcon icon={item.icon} />
            <BtnText>{item.text}</BtnText>
            <BtnTooltip>{item.tooltip}</BtnTooltip>
          </Btn>
        ))}
      </Container>
    </>
  );
}
