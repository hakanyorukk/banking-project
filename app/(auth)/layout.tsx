import Logo from "@/components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen w-full font-inter">
      <div className="fixed top-0  w-full left-0 right-0  bg-amber-600 flex justify-center items-center ">
        <p className="text-slate-950 text-sm sm:text-xl px-6 py-2">
          👋 An example login credentials has been pre-filled. Simply click Sign
          In to proceed.
        </p>
      </div>
      <div className="basis-1/2 bg-gradient-to-tr from-teal-700 to-indigo-950 hidden xl:block">
        <div className="mt-16">
          <Logo />
        </div>
      </div>
      <div className="flex flex-col bg-blue-950 flex-grow">{children}</div>
    </main>
  );
}
