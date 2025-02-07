import { CSSProperties, forwardRef } from "react";

interface CustomWrapperProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

const TableCellWrapper = forwardRef<HTMLElement, CustomWrapperProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <td
        className={
          "size-10 min-w-16 border border-black table-cell text-center align-middle outline outline-[.1px] outline-divider transition duration-[200ms] ease-in-out " +
          className
        }
        style={style}
        {...props}
      >
        {children}
      </td>
    );
  }
);

export default TableCellWrapper;
