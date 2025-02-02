import type { Story, Meta } from "@storybook/react";

import moment from "moment";

import { CountdownClock } from "./CountdownClock";

export default {
  component: CountdownClock,
  title: "Organisms/CountdownClock",
} as Meta;

export const _CountdownClock: Story = args => {
  return (
    <CountdownClock
      {...args}
      date={moment("2022-10-14T09:00:00+08:00")}
      onComplete={() => {
        console.log("complete");
      }}
    />
  );
};

_CountdownClock.args = {
  date: "2022-10-14T09:00:00+08:00",
};
