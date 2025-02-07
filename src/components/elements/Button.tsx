import React, { CSSProperties, FC, JSX, RefObject, forwardRef } from "react";
import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement>;
  icon?: JSX.Element;
}

const Button: FC<CustomButtonProps> = forwardRef(
  ({ children, style, className, icon, ...rest }, ref) => {
    return (
      <button
        ref={ref as any}
        className={clsx(
          "px-4 py-2 bg-foreground text-background rounded transition duration-150 hover:bg-highlight hover:text-foreground flex justify-center items-center gap-2 ",
          className
        )}
        {...rest}
      >
        {icon && icon}
        {children}
      </button>
    );
  }
);

export default Button;
