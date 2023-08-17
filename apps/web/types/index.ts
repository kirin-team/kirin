import { PropsWithChildren } from "react";
import { Locale } from "../middleware";

export type KirinProps<P = unknown> = P &
  PropsWithChildren<{
    lang: Locale;
  }>;
