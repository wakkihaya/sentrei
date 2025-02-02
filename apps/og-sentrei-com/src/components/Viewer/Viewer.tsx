import { Button } from "@sentrei/atoms";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import type { FC } from "react";

import { useConfig } from "@sentrei/og-sentrei-com/hooks/useConfig";
import { useCopy } from "@sentrei/og-sentrei-com/hooks/useCopy";
import { useDebouncedValue } from "@sentrei/og-sentrei-com/hooks/useDebouncedValue";
import { useLayoutConfig } from "@sentrei/og-sentrei-com/hooks/useLayoutConfig";

export const Viewer: FC = () => {
  const [config] = useConfig();
  const [isCopied, copy] = useCopy();
  const [layoutConfig] = useLayoutConfig();
  const [isLoaded, setIsLoaded] = useState(true);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => {
    return `/api/image?${query}`;
  }, [query]);
  const htmlURL = useMemo(() => {
    return `/api/html?${query}`;
  }, [query]);

  const debouncedImageURL = useDebouncedValue(imageURL, 200);

  useEffect(() => {
    return setIsLoaded(false);
  }, [debouncedImageURL]);

  return (
    <div className="col-span-2 space-y-4 w-full">
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={clsx(!isLoaded && "blur-sm")}
          src={debouncedImageURL}
          alt={`OG for the ${config.layoutName} layout`}
          onLoad={(): void => {
            return setIsLoaded(true);
          }}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          onClick={(): void => {
            return copy(`${window.location.origin}${imageURL}`);
          }}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </Button>
        <Button
          href={htmlURL}
          Component="a"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open HTML Page
        </Button>
      </div>
    </div>
  );
};
