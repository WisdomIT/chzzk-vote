import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'

const Input = styled.input`
  font: 400 20px/1 var(--font-default);
  padding: 16px 20px;
  border: 0px;
  border-radius: 8px;

  .dark & {
    background-color: var(--color-background-02);
    color: var(--color-white);

    &::placeholder{
      color: var(--color-white-20);
    }
  }

  @media ${device.mobile} {
    font: 400 14px/1 var(--font-default);
  }
`

export default Input