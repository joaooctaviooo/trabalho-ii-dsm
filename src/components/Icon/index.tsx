import React from "react";
import Feather from "react-native-vector-icons/Feather";

enum IconFont {
  FEATHER = "FEATHER"
}

export const IconList = {
  checkCicle: { name: "check-circle", font: IconFont.FEATHER },
  alertCircle: { name: "alert-circle", font: IconFont.FEATHER },
  checkSquare: { name: "check-square", font: IconFont.FEATHER },
  square: { name: "square", font: IconFont.FEATHER },
  chevronRight: { name: "chevron-right", font: IconFont.FEATHER },
  chevronLeft: { name: "chevron-left", font: IconFont.FEATHER },
  plus: { name: "plus", font: IconFont.FEATHER }
};

export type IconType = {
  name: string;
  font: IconFont;
};

type IconProps = {
  icon: IconType;
  color: string;
  size: number;
};

export const Icon = ({ icon, color, size }: IconProps) => {
  if (icon.font === IconFont.FEATHER) {
    return <Feather name={icon.name} color={color} size={size} />;
  }

  return null;
};
