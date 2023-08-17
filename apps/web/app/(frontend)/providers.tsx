"use client";

import { ThemeProvider, Toaster } from "@kirin/ui";
import { HotkeysProvider } from "react-hotkeys-hook";
import Commander from "../../components/Commander";

export function Providers({ children }) {
  return (
    <HotkeysProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Commander>
          {children}
          <Toaster />
        </Commander>
      </ThemeProvider>
    </HotkeysProvider>
  );
}
