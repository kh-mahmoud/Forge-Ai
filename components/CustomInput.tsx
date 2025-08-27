import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { CustomInputProps } from "@/types";

const CustomInput = ({
  placeholder,
  classes,
  value,
  setValue,
}: CustomInputProps) => {
  return (
    <div>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn("custom-input", classes)}
        required
      />
    </div>
  );
};

export default CustomInput;
