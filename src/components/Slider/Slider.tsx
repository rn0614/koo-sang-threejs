"use client";
import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className=""
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track>
        <RadixSlider.Range />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
