export default function Layout({
  app,
  home,
}: {
  app: React.ReactNode;
  home: React.ReactNode;
}) {
  const isAuthenticated = false;
  return <>{isAuthenticated ? app : home}</>;
}
