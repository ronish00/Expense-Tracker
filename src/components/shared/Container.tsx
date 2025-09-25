import { ReactNode } from "react";

const Container = ({
  children,
  extraClass,
}: {
  children: ReactNode;
  extraClass?: string;
}) => {
  return <div className={`max-w-6xl mx-auto ${extraClass}`}>{children}</div>;
};

export default Container;
