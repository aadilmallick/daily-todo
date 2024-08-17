import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="absolute top-0 left-64 right-0 h-full bg-slate-100">
      {children}
    </section>
  );
};

export default PageContainer;
