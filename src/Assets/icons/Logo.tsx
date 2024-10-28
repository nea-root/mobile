import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
}
const LogoIcon: React.FC<IconProps>  = ({ width = 55, height = 48, ...props }) => (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" {...props}>
        <Path
            d="M14.8656 40.2474V0.462404C14.8656 0.245242 15.0461 0.068785 15.2632 0.073328C23.5908 0.247579 26.0733 5.89277 26.2686 8.7374V47.4925C26.2686 47.8084 25.9147 47.9954 25.6537 47.8172L15.0372 40.5722C14.9298 40.499 14.8656 40.3774 14.8656 40.2474Z"
            fill="url(#paint0_linear_625_6471)"
        />
        <Path
            d="M29.0202 9.11306V14.7183C29.0202 14.9355 29.1962 15.1094 29.4134 15.1094H40.2265C40.4437 15.1094 40.6197 14.9334 40.6197 14.7162V0.397495C40.6197 0.207465 40.4833 0.0466029 40.2941 0.0297752C39.3783 -0.0516377 36.6381 -0.0963124 33.4437 1.74046C29.5117 4.00141 29.0202 7.73684 29.0202 9.11306Z"
            fill="url(#paint1_linear_625_6471)"
        />
        <Path
            d="M2.24607 7.22687C5.60362 1.33787 10.3416 0.430687 11.7218 0.290937C11.9379 0.269061 12.1132 0.441529 12.1132 0.658688V37.0227C12.1132 37.3787 11.6846 37.5512 11.4454 37.2877C9.82632 35.5042 5.64072 30.7451 3.13411 26.542C-0.0233552 21.2475 -1.5645 13.9105 2.24607 7.22687Z"
            fill="url(#paint2_linear_625_6471)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M54.5787 15.1094C54.7959 15.1094 54.9719 14.9334 54.9719 14.7162V9.11306C54.9719 7.73684 54.4554 4.00141 50.3234 1.74046C46.9497 -0.105607 44.058 -0.0511374 43.1103 0.0310136C42.9197 0.0475349 42.7826 0.209055 42.7826 0.40035V14.7162C42.7826 14.9334 42.9586 15.1094 43.1758 15.1094H54.5787ZM48.9805 6.16399C48.1818 6.16399 47.5343 6.81147 47.5343 7.61019V9.53456C47.5343 10.3333 48.1818 10.9808 48.9805 10.9808C49.7792 10.9808 50.4267 10.3333 50.4267 9.53456V7.61019C50.4267 6.81147 49.7792 6.16399 48.9805 6.16399Z"
            fill="url(#paint3_linear_625_6471)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.0202 18.1569C29.0202 17.9397 29.1962 17.7637 29.4134 17.7637H54.3529C54.581 17.7637 54.7618 17.9544 54.7375 18.1813C54.3643 21.664 52.148 29.429 45.7609 35.8293C39.5085 42.0947 32.7084 46.34 29.5798 47.9566C29.3222 48.0898 29.0202 47.9003 29.0202 47.6103V35.1747C29.0202 35.1467 29.0229 35.1197 29.0291 35.0924C29.3772 33.5577 30.9129 30.5665 34.3693 30.5665H37.6707C37.8879 30.5665 38.0639 30.3905 38.0639 30.1733V28.1823C38.0639 27.9652 37.8879 27.7891 37.6707 27.7891H34.3693C32.5862 27.8222 29.0202 27.3127 29.0202 25.0098V18.1569ZM40.0299 27.7891C39.8128 27.7891 39.6367 27.9652 39.6367 28.1823V30.1733C39.6367 30.3905 39.8128 30.5665 40.0299 30.5665H41.7986C42.9385 30.6935 43.4415 30.0513 43.4415 29.2649C43.4415 28.4785 42.8525 27.9065 41.7986 27.7891H40.0299Z"
            fill="url(#paint4_linear_625_6471)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_625_6471"
                x1="20.7163"
                y1="0.0427593"
                x2="20.7163"
                y2="48.6563"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#4AC16A" />
                <Stop offset="1" stopColor="#147952" />
            </LinearGradient>
            <LinearGradient
                id="paint1_linear_625_6471"
                x1="34.9718"
                y1="-0.00963292"
                x2="34.9718"
                y2="15.3528"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#4AC16A" />
                <Stop offset="1" stopColor="#147952" />
            </LinearGradient>
            <LinearGradient
                id="paint2_linear_625_6471"
                x1="6.21511"
                y1="0.265393"
                x2="6.21511"
                y2="38.0131"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#4AC16A" />
                <Stop offset="1" stopColor="#147952" />
            </LinearGradient>
            <LinearGradient
                id="paint3_linear_625_6471"
                x1="49.0368"
                y1="-0.00963292"
                x2="49.0368"
                y2="15.3528"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#4AC16A" />
                <Stop offset="1" stopColor="#147952" />
            </LinearGradient>
            <LinearGradient
                id="paint4_linear_625_6471"
                x1="42.2166"
                y1="17.7444"
                x2="42.2166"
                y2="48.487"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#4AC16A" />
                <Stop offset="1" stopColor="#147952" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default LogoIcon;
