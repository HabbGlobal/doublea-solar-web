import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/** Sprachbewusste Varianten von Link, redirect, usePathname, useRouter. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
