// src/components/icons/SearchIcon.tsx
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface SearchIconProps {
  color?: string;
  size?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({ color = colors.light, size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Circle cx="8" cy="8" r="5.5" stroke={color} strokeWidth="1.6" />
    <Path d="M12.5 12.5L15.5 15.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

export default SearchIcon;