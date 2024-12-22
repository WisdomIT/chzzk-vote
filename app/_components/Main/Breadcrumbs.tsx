import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import {
  Container,
  BreadcrumbLink,
  BreadcrumbButton,
  Icon,
  Text,
  Next,
} from "./Breadcrumbs.styled";
import { faChevronRight } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

export default function Breadcrumbs({
  icon,
  text,
}: {
  icon: IconDefinition;
  text: string;
}) {
  function handleClickSelf() {
    location.reload();
  }

  return (
    <Container>
      <BreadcrumbLink href="/">
        <Icon icon={faHome} height={14} />
        <Text>홈</Text>
      </BreadcrumbLink>
      <Next icon={faChevronRight} height={12} />
      <BreadcrumbButton onClick={handleClickSelf}>
        <Icon icon={icon} height={14} />
        <Text>{text}</Text>
      </BreadcrumbButton>
    </Container>
  );
}
