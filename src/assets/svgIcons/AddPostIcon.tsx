import React from "react";
import Svg, { Path } from "react-native-svg";

interface addPostIconProps {
    color: string;
    size: number;
    focused: boolean;
}

const AddPostIcon = ({ color, size, focused }: addPostIconProps) => {
    const strokeWidth = focused ? '3' : '2';
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <Path
               fill={'white'}
               stroke={'black'}
               strokeWidth={strokeWidth}
               d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
               strokeLinecap="round"
            />
        </Svg>
    );
};

export default AddPostIcon;


