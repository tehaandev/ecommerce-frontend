import { theme } from "../../theme";
import { ConfigProvider } from "antd";
import React from "react";

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
