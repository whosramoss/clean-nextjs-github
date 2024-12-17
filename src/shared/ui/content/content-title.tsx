import React from "react";
import { Content } from "src/shared/ui/content";

type ContentTitleProps = {
  children: React.ReactNode
}

export default function ContentTitle({ children, ...rest }: ContentTitleProps) {
  return (
    <Content.Box className="col-span-12 text-6xl font-semibold leading-tight " {...rest}>
      {children}
    </Content.Box>
  );
};
