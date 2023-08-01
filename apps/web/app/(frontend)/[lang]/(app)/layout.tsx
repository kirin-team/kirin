import { PropsWithDefault } from '../../../../types';

export default function Layout({
  app,
  landing,
}: PropsWithDefault<{
  app: React.ReactNode;
  landing: React.ReactNode;
}>) {
  const isAuthenticated = true;
  return <>{isAuthenticated ? app : landing}</>;
}
