import Header from "../shared/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-satoshi p-4 lg:p-8 xl:p-12">
      <Header />
      <div>{children}</div>
    </main>
  );
}
