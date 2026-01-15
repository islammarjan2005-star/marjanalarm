/**
 * Theme index - exports all theme values
 */

export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { fontSizes, textStyles, fontWeights, lineHeights } from './typography';
import { spacing, borderRadius, shadows, layout } from './spacing';

export const theme = {
  colors,
  fontSizes,
  textStyles,
  fontWeights,
  lineHeights,
  spacing,
  borderRadius,
  shadows,
  layout,
};

export type Theme = typeof theme;
