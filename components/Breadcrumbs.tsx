import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'
import Link from "next/link";
import { useRouter } from "next/router";

const Frame = styled.div`
  display: flex;
  position: absolute;
  top: 40px;
  left: 40px;
  gap: 10px;
  align-items: center;

  @media ${device.mobile} {
    top: 10px;
    left: 10px;
  }
`

const Breadcrumb = styled(Link)`
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-white-10);
  }
`

const BreadcrumbIcon = styled.i`
  font-size: 14px;
  color: var(--color-brand);
  margin-right: 4px;
`

const BreadcrumbText = styled.p`
  display: inline-block;
  font: 600 14px/1 var(--font-default);
  color: var(--color-brand);
`

const BreadcrumbNext = styled.i`
  font-size: 12px;
  color: var(--color-brand);
`

type BreadcrumbsType = {
  icon: string,
  text: string,
  href: string
}

const Breadcrumbs = (props: BreadcrumbsType) => {

  const { icon, text, href } = props
  const router = useRouter()

  return <Frame>
    <Breadcrumb href="/">
      <BreadcrumbIcon className="fa-sharp fa-light fa-home" />
      <BreadcrumbText>홈</BreadcrumbText>
    </Breadcrumb>
    <BreadcrumbNext className="fa-sharp fa-solid fa-chevron-right" />
    <Breadcrumb href={href} >
      <BreadcrumbIcon className={`fa-sharp fa-light fa-${icon}`} />
      <BreadcrumbText>{text}</BreadcrumbText>
    </Breadcrumb>
  </Frame>
}

export default Breadcrumbs