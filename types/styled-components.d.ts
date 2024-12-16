import "styled-components";
import { Theme } from "@/styles/style";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
