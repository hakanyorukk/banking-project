import React from "react";

const loading = () => {
  return (
    <section className="h-screen w-full flex p-12">
      <main className="flex flex-col gap-16 w-full h-full">
        <div className="relative w-full basis-1/4 dark:bg-slate-800 bg-slate-50 overflow-hidden rounded-2xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent dark:via-slate-700 via-slate-200 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative w-full basis-1/4 dark:bg-slate-800 bg-slate-50 overflow-hidden rounded-2xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent dark:via-slate-700 via-slate-200 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative w-full basis-1/4 dark:bg-slate-800 bg-slate-50 overflow-hidden rounded-2xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent dark:via-slate-700 via-slate-200 to-transparent animate-shimmer"></div>
        </div>
      </main>
    </section>
  );
};

export default loading;
