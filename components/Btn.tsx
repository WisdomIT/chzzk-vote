import styled from "styled-components";
import { size, device, truncate } from '@/lib/style'

const Btn = styled.a<{ $type: string, $width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 800 24px/1 var(--font-default);
  height: 80px;
  width: ${props => props.$width}px;
  border-radius: 8px;
  cursor: pointer;
  animation: appear .2s;

  .dark & {
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
    border: 3px solid var(--color-brand);
  }

  .light & {
    background-color: ${props =>
      props.$type === "line" ? 'var(--color-white)' :
      props.$type === "default" ? 'var(--color-brand-light)' :
      'var(--color-brand)'
    };
    color: ${props =>
      props.$type === "line" ? 'var(--color-brand-light)' :
      props.$type === "default" ? 'var(--color-white)' :
      'var(--color-white)'
    };
    border: 3px solid var(--color-brand-light);
  }

  &:hover {

    .dark & {
      opacity: 0.8;
    }

    .light & {
      opacity: 0.5;
    }
  }

  @media ${device.mobile} {
    font: 800 14px/1 var(--font-default);
    height: 48px;
    width: ${props => props.$width / 1.8}px;
  }
`

export default Btn