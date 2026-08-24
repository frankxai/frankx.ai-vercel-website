"use client";

import type { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

export function TrackedBookingLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("connect_booking_clicked", {
          source: "connect_university_workshop",
          destination: href,
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
