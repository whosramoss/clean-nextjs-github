import Utils from "src/shared/utils/utils";
import * as React from "react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        className={Utils.cn(
          "w-full text-white rounded text-sm border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-blue-300 focus:outline-0",
          className,
        )}
      />

    );
  },
);

FormInput.displayName = "FormInput";

export { FormInput };
