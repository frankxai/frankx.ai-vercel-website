"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export function ConnectNewsletterForm() {
  const honeypotId = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, listType: "inner-circle" }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message ?? "Subscription failed");
      }

      trackEvent("connect_waitlist_signed_up", { listType: "inner-circle" });
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }

  return (
    <div className="border-l-2 border-[#2157d5] bg-[#ebe3d4] p-6 sm:p-8 lg:p-10">
      <p className="text-sm font-semibold text-[#2157d5]">FrankX field notes</p>
      <p className="mt-3 text-xl font-medium leading-7 tracking-[-0.02em] text-[#171915]">
        One considered note when there is something worth sending.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <input
            id={honeypotId}
            aria-hidden="true"
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <label
          htmlFor="connect-newsletter-email"
          className="text-sm font-medium text-[#373b34]"
        >
          Email address
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="connect-newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "submitting" || status === "success"}
            placeholder="you@domain.com"
            aria-describedby="connect-newsletter-status"
            className="min-h-12 flex-1 border border-[#171915]/30 bg-[#f8f5ee] px-4 py-3 text-base text-[#171915] placeholder:text-[#777b72] focus:border-[#2157d5] focus:outline-none focus:ring-2 focus:ring-[#2157d5]/30 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#171915] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2157d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ebe3d4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? "Sending…"
              : status === "success"
                ? "Subscribed"
                : "Subscribe"}
            {status === "idle" && (
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden
              />
            )}
          </button>
        </div>
      </form>

      <p className="mt-3 text-xs leading-5 text-[#666a61]">
        Occasional notes. Unsubscribe anytime. Read the{" "}
        <Link
          href="/privacy"
          className="underline decoration-[#171915]/35 underline-offset-2 hover:text-[#171915]"
        >
          Privacy details
        </Link>
        .
      </p>

      <div
        id="connect-newsletter-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 min-h-5 text-sm"
      >
        {status === "success" && (
          <div className="flex items-center gap-2 text-[#225b3b]">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            <span>You are on the list. Check your inbox.</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-[#8a3f2d]">
            <AlertCircle className="h-4 w-4" aria-hidden />
            <span>
              {errorMessage || "Something went wrong. Please try again."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
