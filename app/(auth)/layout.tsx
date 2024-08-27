import Logo from "@/components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full  font-inter">
      <div className="basis-1/2 bg-gradient-to-tr from-teal-700 to-indigo-950">
        <div className="mt-16">
          <Logo />
        </div>
      </div>
      <div className="flex flex-col bg-blue-950 flex-grow">{children}</div>
    </main>
  );
}
