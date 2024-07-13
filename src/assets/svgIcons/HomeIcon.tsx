import React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeIconProps {
    color: string;
    size: number;
    focused: boolean;
}

const HomeIcon = ({ color, size, focused }: HomeIconProps) => {
    const strokeWidth = focused ? '0.8' : '0.5';
    const scaleFactor = size / 24; 

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
        >
            <Path
               fill={'black'}
               stroke={'black'}
               strokeWidth={strokeWidth}
                d={`M ${8 * scaleFactor} ${1.320313 * scaleFactor} L ${0.660156 * scaleFactor} ${8.132813 * scaleFactor} L ${1.339844 * scaleFactor} ${8.867188 * scaleFactor} L ${2 * scaleFactor} ${8.253906 * scaleFactor} L ${2 * scaleFactor} ${14 * scaleFactor} L ${7 * scaleFactor} ${14 * scaleFactor} L ${7 * scaleFactor} ${9 * scaleFactor} L ${9 * scaleFactor} ${9 * scaleFactor} L ${9 * scaleFactor} ${14 * scaleFactor} L ${14 * scaleFactor} ${14 * scaleFactor} L ${14 * scaleFactor} ${8.253906 * scaleFactor} L ${14.660156 * scaleFactor} ${8.867188 * scaleFactor} L ${15.339844 * scaleFactor} ${8.132813 * scaleFactor} Z M ${8 * scaleFactor} ${2.679688 * scaleFactor} L ${13 * scaleFactor} ${7.328125 * scaleFactor} L ${13 * scaleFactor} ${13 * scaleFactor} L ${10 * scaleFactor} ${13 * scaleFactor} L ${10 * scaleFactor} ${8 * scaleFactor} L ${6 * scaleFactor} ${8 * scaleFactor} L ${6 * scaleFactor} ${13 * scaleFactor} L ${3 * scaleFactor} ${13 * scaleFactor} L ${3 * scaleFactor} ${7.328125 * scaleFactor} Z`}
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default HomeIcon;
