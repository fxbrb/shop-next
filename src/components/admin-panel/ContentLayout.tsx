import React from "react";
import { Navbar } from "./Navbar";

export type ContentLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const ContentLayout = (props: ContentLayoutProps) => {
  return (
    <div>
      <Navbar title={props.title} />
      <div className="container py-8 px-4 sm:px-8">{props.children}</div>
    </div>
  );
};
