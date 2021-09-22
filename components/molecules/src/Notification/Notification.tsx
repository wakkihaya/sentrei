import { Toast, Button } from "@sentrei/atoms";
import clsx from "clsx";

import type { FC } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

// eslint-disable-next-line no-restricted-imports
import { isToastShowingState } from "../../../models/recoilState"; //TODO: set Path.

import styles from "./Notification.module.scss";

export const ToastPosition = {
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  TOP_CENTER: "top-center",
};

export interface NotificationProps {
  position?: string;
  autoDeleteTime?: number; //seconds
  isAutoDelete?: boolean;
  toastBgColor?: string;
  toastTextColor?: string;
  title?: string;
  description?: string;
}

export const Notification: FC<NotificationProps> = props => {
  const {
    position = ToastPosition.TOP_CENTER,
    autoDeleteTime = 5,
    isAutoDelete = true,
    toastBgColor,
    toastTextColor,
    title = "Notification",
    description = "Notify your status...",
  } = props;
  const [isToastShowing, setIsToastShowing] =
    useRecoilState(isToastShowingState);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoDelete) {
        setIsToastShowing(false);
      }
    }, autoDeleteTime * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [autoDeleteTime, isAutoDelete]);

  return (
    <>
      <div className={clsx("relative w-screen h-screen")}>
        <Button
          onClick={(): void => {
            setIsToastShowing(true);
          }}
        >
          Info
        </Button>
        {isToastShowing && (
          <div className={clsx("w-full h-full")}>
            <Toast
              title={title}
              description={description}
              reactIcon="info"
              bgColor={toastBgColor}
              textColor={toastTextColor}
              className={clsx("absolute", styles[position])}
              onClick={(): void => {
                setIsToastShowing(false);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
