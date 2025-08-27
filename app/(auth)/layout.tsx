


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-50">
        {children}
      </main>  
  );
}
