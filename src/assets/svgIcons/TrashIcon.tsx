import * as React from "react";
import Svg, { Path, Line } from "react-native-svg";
const TrashIcon = () => (
  <Svg
    id="Layer_1"
    viewBox="0 0 32 32"
    width={20}
    height={20}
  >
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M23,27H11c-1.1,0-2-0.9-2-2V8h16v17 C25,26.1,24.1,27,23,27z"
    />
    <Line
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={27}
      y1={8}
      x2={7}
      y2={8}
    />
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M14,8V6c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v2"
    />
    <Line
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={17}
      y1={23}
      x2={17}
      y2={12}
    />
    <Line
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={21}
      y1={23}
      x2={21}
      y2={12}
    />
    <Line
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={13}
      y1={23}
      x2={13}
      y2={12}
    />
  </Svg>
);
export default TrashIcon;
