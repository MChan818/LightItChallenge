import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-80 bg-gray-200 rounded-3xl flex flex-col gap-6 justify-center items-center">
      {children}
    </div>
  );
};

export default Container;
