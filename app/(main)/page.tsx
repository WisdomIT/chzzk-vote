"use client";

import styled from "styled-components";

const TestDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.brand};
  width: 40px;
  height: 40px;
  margin: 20px;
`;

export default function Page() {
  return <TestDiv>가나다라</TestDiv>;
}
