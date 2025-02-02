import "tailwindcss/tailwind.css";
import { SeoRoot, AnalyticsRoot } from "@sentrei/roots";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { RecoilRoot } from "recoil";

const AppRoot: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <AnalyticsRoot />
      <SeoRoot
        title="Metashop"
        subTitle="Metashop"
        description="Metashop"
        url="https://metashop.wtf"
        twitter="@metashop"
      />
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default AppRoot;
