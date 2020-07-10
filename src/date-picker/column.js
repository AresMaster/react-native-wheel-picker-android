import WheelPicker from "../wheel-picker";
import React from "react";

export const titles = array => array.map(item => item.title);

export default ({ list, ...props }) => (
    <WheelPicker
        data={titles(list)}
        isAtmospheric
        isCurved
        itemTextSize={60}
        itemTextFontFamily="Roboto-Bold"
        backgroundColor="white"
        minuteInterval={15}
        isCurved={true}
        selectedItemTextColor="#B9CA00"
        visibleItemCount={3}
        //renderIndicator={true}
        indicatorColor="#B9CA00"
        allowFontScaling = {true}
        {...props}
    />
);
