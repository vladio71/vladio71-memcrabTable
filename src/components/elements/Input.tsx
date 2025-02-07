import React, { CSSProperties, FC, forwardRef } from "react";
import clsx from "clsx";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  style?: CSSProperties;
}

const Input: FC<CustomInputProps> = forwardRef(
  ({ className, style, name, ...inputProps }) => {
    return (
      <div className="relative">
        <div>{name}</div>
        <input
          className={clsx("p-2 min-w-32 text-black", className)}
          {...inputProps}
        />
      </div>
    );
  }
);

export default Input;
