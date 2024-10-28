import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
}
const SuccessIcon: React.FC<IconProps>  = ({ color = '#07D95A', width = 20, height = 20, ...props }) => (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...props}>
        <G clip-path="url(#clip0_100_1129)">
            <Path
                d="M10.0001 18.3337C14.6025 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6025 1.66699 10.0001 1.66699C5.39771 1.66699 1.66675 5.39795 1.66675 10.0003C1.66675 14.6027 5.39771 18.3337 10.0001 18.3337Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M14.1667 7.5L9.0105 12.5L6.66675 10.2273"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_100_1129">
                <Rect width={width} height={height} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default SuccessIcon;
