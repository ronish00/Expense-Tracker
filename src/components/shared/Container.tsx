import { ReactNode } from "react";

const Container = ({
  children,
  extraClass,
}: {
  children: ReactNode;
  extraClass?: string;
}) => {
  return <div className={`lg:max-w-6xl lg:px-6 px-8 mx-auto ${extraClass}`}>{children}</div>;
};

export default Container;
