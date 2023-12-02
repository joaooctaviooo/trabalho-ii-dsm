import "styled-components";

import { theme } from "../global/index";

export type ITheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
