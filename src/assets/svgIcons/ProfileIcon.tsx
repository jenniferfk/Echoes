import React from "react";
import Svg, { Path, Circle, G } from "react-native-svg";

interface ProfileIconProps {
    color: string;
    size: number;
    focused:boolean;
}

const ProfileIcon = ({ color, size, focused }: ProfileIconProps) => {
    const strokeWidth = focused ? '2.3' : '2';
    const fillColor = focused ? 'black' : 'none';
    const profilefillColor = focused ? 'white' : 'black';
    return (
        <Svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
    >
        <G>
        <Circle
          cx="16"
          cy="16"
          r="15"
          fill={fillColor}
          stroke={'black'}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
        <Path
           fill={profilefillColor}
           stroke={'black'}
           strokeWidth={strokeWidth}
           d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
           strokeLinecap="round"
        />
         <Circle
          cx="16"
          cy="11"
          r="6"
          fill={profilefillColor}
          stroke="#000000"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
        />
        </G>
    </Svg>
    );
};

export default ProfileIcon;
/*
<?xml version="1.0" ?>
<svg enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><desc/>
<g><circle cx="16" cy="16" fill="none" r="15" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
<path d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0" 
fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
<circle cx="16" cy="11" fill="none" r="6" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>

</g></svg>
*/