import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@awesome.me/kit-8710ef4103/icons/sharp/light";
import { Container, Breadcrumb, Icon, Text, Next } from "./Breadcrumbs.styled";
import { faChevronRight } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

export default function Breadcrumbs({
  icon,
  text,
  href,
}: {
  icon: IconDefinition;
  text: string;
  href: string;
}) {
  return (
    <Container>
      <Breadcrumb href="/">
        <Icon icon={faHome} />
        <Text>홈</Text>
      </Breadcrumb>
      <Next icon={faChevronRight} />
      <Breadcrumb href={href}>
        <Icon icon={icon} />
        <Text>{text}</Text>
      </Breadcrumb>
    </Container>
  );
}
