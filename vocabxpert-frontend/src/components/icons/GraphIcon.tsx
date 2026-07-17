// src/components/icons/GraphIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface GraphIconProps {
  color?: string;
  size?: number;
}

const GraphIcon: React.FC<GraphIconProps> = ({ color = colors.primary, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 20H20V22H4V20ZM6 17H8V4H6V17ZM11 17H13V9H11V17ZM16 17H18V13H16V17Z" fill={color} />
  </Svg>
);

export default GraphIcon;