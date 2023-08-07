export default function Layout({
  app,
  landing,
}: {
  app: React.ReactNode;
  landing: React.ReactNode;
}) {
  const isAuthenticated = false;
  return <>{isAuthenticated ? app : landing}</>;
}
