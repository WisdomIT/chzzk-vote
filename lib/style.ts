import { styled, css } from 'styled-components'

export const size = {
  mobile: 768,
  tablet: 1300,
  desktop: 1920
}

export const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`
};

export const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`