import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";

interface InstagramReelsIconProps {
    color: string;
    size: number;
    focused:boolean;
}

const ReelsIcon = ({ color, size, focused }: InstagramReelsIconProps) => {
    const strokeWidth = focused ? '0.8' : '0.2';
    const scaleFactor = size / 24; 

    return (
        <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <G transform="translate(-0.025,-290.6739)">
        <Path
           fill={'black'}
           stroke={'black'}
           strokeWidth={strokeWidth}
           d="m 5.99961,292.64948 c -2.19871,0 -4,1.8013 -4,4 v 12.04883 c 0,2.1987 1.80129,4 4,4 h 12.05078 c 2.19871,0 4,-1.8013 4,-4 v -12.04883 c 0,-2.1987 -1.80129,-4 -4,-4 z m 0,2 h 1 v 4 h -3 v -2 c 0,-1.1253 0.8747,-2 2,-2 z m 3,0 h 6 v 16.04883 h -6 z m 8,0 h 1.05078 c 1.1253,0 2,0.8747 2,2 v 2 h -3.05078 z m -13,6 h 3 v 4 h -3 z m 13,0 h 3.05078 v 4 h -3.05078 z m -13,6 h 3 v 4.04883 h -1 c -1.1253,0 -2,-0.87471 -2,-2 z m 13,0 h 3.05078 v 2.04883 c 0,1.1253 -0.8747,2 -2,2 h -1.05078 z"
           strokeLinecap="round"
        /></G>
    </Svg>
    );
};

export default ReelsIcon;
/*
<?xml version="1.0" ?>
<svg height="24" id="svg8" version="1.1" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2"/>
<g id="g1330" style="display:inline" transform="translate(-0.025,-290.6739)"><path d="m 5.99961,292.64948 c -2.19871,0 -4,1.8013 -4,4 v 12.04883 c 0,2.1987 1.80129,4 4,4 h 12.05078 c 2.19871,0 4,-1.8013 4,-4 v -12.04883 c 0,-2.1987 -1.80129,-4 -4,-4 z m 0,2 h 1 v 4 h -3 v -2 c 0,-1.1253 0.8747,-2 2,-2 z m 3,0 h 6 v 16.04883 h -6 z m 8,0 h 1.05078 c 1.1253,0 2,0.8747 2,2 v 2 h -3.05078 z m -13,6 h 3 v 4 h -3 z m 13,0 h 3.05078 v 4 h -3.05078 z m -13,6 h 3 v 4.04883 h -1 c -1.1253,0 -2,-0.87471 -2,-2 z m 13,0 h 3.05078 v 2.04883 c 0,1.1253 -0.8747,2 -2,2 h -1.05078 z"
 id="rect1309" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#000000;stop-opacity:1"/>
</g></svg>*/