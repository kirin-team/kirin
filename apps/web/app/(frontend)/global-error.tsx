"use client";

import { KirinProps } from "@types";

export default function GlobalError({
  lang,
}: KirinProps<{
  error: Error;
  reset: () => void;
}>) {
  return (
    <html lang={lang}>
      <body>
        <h1>Something went wrong!</h1>
      </body>
    </html>
  );
}
