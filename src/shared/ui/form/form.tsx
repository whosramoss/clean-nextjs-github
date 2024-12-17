import Utils from "src/shared/utils/utils";
import * as React from "react";

export interface FormRootProps
  extends React.FormHTMLAttributes<HTMLFormElement> { }

const FormRoot = React.forwardRef<HTMLInputElement, FormRootProps>(
  ({ className, onSubmit, ...props }, ref) => {
    return (
      <form
        {...props}
        onSubmit={onSubmit}
        className={Utils.cn(
          "flex items-center gap-2",
          className,
        )}
      />

    );
  },
);

FormRoot.displayName = "FormRoot";

export { FormRoot };
