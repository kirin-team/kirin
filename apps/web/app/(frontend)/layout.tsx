import '../../styles/global.css';
import { KirinProps } from '../../types';
import { Providers } from './providers';
import StyledJsxRegistry from './registry';

export default function Layout({ lang, children }: KirinProps) {
  return (
    <>
      <html lang={lang}>
        <body>
          <StyledJsxRegistry>
            <Providers>{children}</Providers>
          </StyledJsxRegistry>
        </body>
      </html>
    </>
  );
}
