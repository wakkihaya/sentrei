import type { Story, Meta } from "@storybook/react";
import { useState } from "react";

import type { ToastProps } from "./Toast";
import { Toast, ReactIconsType } from "./Toast";

export default {
  component: Toast,
  title: "Atoms/Toast",
} as Meta;

export const _Toast: Story<ToastProps> = args => {
  const [isToastShowing, setIsToastShowing] = useState<boolean>(true);
  const removeToast = () => {
    setIsToastShowing(false);
  };
  return <>{isToastShowing && <Toast {...args} onClick={removeToast} />}</>;
};

_Toast.args = {
  title: "Test",
  description: "Description Description",
  reactIcon: ReactIconsType.DANGER,
};
