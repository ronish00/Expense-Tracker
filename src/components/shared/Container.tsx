import { ReactNode } from "react";

const Container = ({
  children,
  extraClass,
}: {
  children: ReactNode;
  extraClass?: string;
}) => {
  return <div className={`lg:max-w-6xl lg:px-8 px-6 mx-auto ${extraClass}`}>{children}</div>;
};

export default Container;
