// src/components/icons/ChevronDownIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface ChevronDownIconProps {
  color?: string;
  size?: number;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ color = colors.muted, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default ChevronDownIcon;