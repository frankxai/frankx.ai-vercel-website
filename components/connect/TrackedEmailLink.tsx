"use client";

import type { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

export function TrackedEmailLink({
  href,
  source,
  className,
  children,
}: {
  href: string;
  source: "connect_hero" | "connect_footer";
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("connect_email_clicked", { source })}
      className={className}
    >
      {children}
    </a>
  );
}
