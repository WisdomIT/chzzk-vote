import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Btn, BtnIcon, BtnText, BtnTooltip } from "./IndexButton.styled";

export interface IndexButtonType {
  href: string;
  icon: IconDefinition;
  text: string;
  tooltip: string;
}

export default function IndexButton({
  href,
  icon,
  text,
  tooltip,
}: IndexButtonType) {
  return (
    <Btn href={href}>
      <BtnIcon icon={icon} />
      <BtnText>{text}</BtnText>
      <BtnTooltip>{tooltip}</BtnTooltip>
    </Btn>
  );
}
