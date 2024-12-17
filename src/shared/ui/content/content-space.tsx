import Utils from "src/shared/utils/utils";
import React from "react";
import ContentBox from "src/shared/ui/content/content-box";

type ContentSpaceProps = {
  hasBoder?: boolean
}

export default function ContentSpace({ hasBoder = false, ...rest }: ContentSpaceProps) {
  return (
    < ContentBox
      className={Utils.cn(
        "col-span-12 my-4 border border-zinc-800 ",
        { "border-none": !hasBoder },
      )}
      {...rest}
    />
  );
};
