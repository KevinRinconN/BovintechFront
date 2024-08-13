export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex min-h-screen flex-col items-end justify-center p-24 bg-cover bg-no-repeat bg-left-top "
      style={{ backgroundImage: `url("/img/fondo.jpg")` }}
    >
      {children}
    </main>
  );
}
