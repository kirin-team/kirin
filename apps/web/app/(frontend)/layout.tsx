import { PropsWithDefault } from '../../types';

export default function Layout({ lang, children }: PropsWithDefault) {
  return (
    <>
      <html lang={lang}>
        <body>{children}</body>
      </html>
    </>
  );
}
