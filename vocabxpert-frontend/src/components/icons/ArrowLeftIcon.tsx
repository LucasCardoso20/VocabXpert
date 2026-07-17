// src/components/icons/ArrowLeftIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface ArrowLeftIconProps {
  color?: string;
  size?: number;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ color = colors.text, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default ArrowLeftIcon;