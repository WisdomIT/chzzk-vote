import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'

const Btn = styled.a<{ $type: string, $width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.$type === "line" ? 'var(--color-background-01)' :
    props.$type === "default" ? 'var(--color-brand)' :
    'var(--color-brand)'
  };
  color: ${props =>
    props.$type === "line" ? 'var(--color-brand)' :
    props.$type === "default" ? 'var(--color-black)' :
    'var(--color-black)'
  };
  font: 800 24px/1 var(--font-default);
  height: 80px;
  width: ${props => props.$width}px;
  border: 3px solid var(--color-brand);
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media ${device.mobile} {
    font: 800 14px/1 var(--font-default);
    height: 48px;
    width: ${props => props.$width / 2}px;
  }
`

export default Btn