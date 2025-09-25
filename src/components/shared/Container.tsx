import { ReactNode } from "react";

const Container = ({
  children,
  extraClass,
}: {
  children: ReactNode;
  extraClass?: String;
}) => {
  return <div className={`max-w-6xl mx-auto ${extraClass}`}>{children}</div>;
};

export default Container;
