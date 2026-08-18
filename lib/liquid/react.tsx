/* Vendored from starlight-liquid v0.1.0. Do not edit here —
   change repos/starlight-liquid/src and re-run scripts/sync.mjs. */
'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import { createLiquidField } from './core/field.js';
import { enhanceForm } from './core/form.js';
import { magnetize } from './core/magnetic.js';
import { createBubbleDrift } from './core/scroll.js';

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export type LiquidFieldProps = HTMLAttributes<HTMLDivElement> & {
  tints?: [string, string, string];
  intensity?: number;
  blobCount?: number;
  pointer?: boolean;
  children?: ReactNode;
};

/** Ambient WebGL liquid field behind its children. One per viewport, at most. */
export function LiquidField({
  tints,
  intensity,
  blobCount,
  pointer,
  className,
  children,
  ...rest
}: LiquidFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Serialized so a fresh array literal from the parent does not remount the field.
  const tintKey = tints?.join(',');

  useEffect(() => {
    if (!hostRef.current) return;
    const handle = createLiquidField(hostRef.current, {
      tints: tintKey?.split(','),
      intensity,
      blobCount,
      pointer,
    });
    return () => handle.destroy();
  }, [tintKey, intensity, blobCount, pointer]);

  return (
    <div ref={hostRef} className={cx('liquid-field', className)} {...rest}>
      {children}
    </div>
  );
}

export type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  magnetic?: boolean;
};

export function LiquidGlass({
  interactive,
  magnetic,
  className,
  children,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic || !ref.current) return;
    const handle = magnetize(ref.current);
    return () => handle.destroy();
  }, [magnetic]);

  return (
    <div
      ref={ref}
      className={cx('liquid-glass', interactive && 'liquid-glass--interactive', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export type LiquidFormProps = FormHTMLAttributes<HTMLFormElement> & {
  ripple?: boolean;
  trackCaret?: boolean;
};

/**
 * Wraps a real <form>. Every native input inside gets the focus bubble and
 * validity hue; submission, validation, and server actions are untouched.
 */
export function LiquidForm({ ripple, trackCaret, className, children, ...rest }: LiquidFormProps) {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // wrap: false — React owns this DOM; fields must carry their own shell span.
    const handle = enhanceForm(ref.current, { ripple, trackCaret, wrap: false });
    return () => handle.destroy();
  }, [ripple, trackCaret]);

  return (
    <form ref={ref} className={cx('liquid-form', className)} {...rest}>
      {children}
    </form>
  );
}

export type LiquidInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

/** A labelled input already wrapped in its shell — the label is never optional. */
export const LiquidInput = forwardRef<HTMLInputElement, LiquidInputProps>(function LiquidInput(
  { label, hint, id, className, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cx('liquid-input', className)}>
      <label htmlFor={inputId}>{label}</label>
      <span className="liquid-field-shell">
        <input id={inputId} ref={ref} aria-describedby={hintId} {...rest} />
      </span>
      {hint ? (
        <span id={hintId} className="liquid-input__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
});

/**
 * Scroll-linked bubble drift over descendants carrying `data-liquid-bubble`.
 * Pass the host page's own gsap/ScrollTrigger to author on its scroll system
 * rather than starting a second one.
 */
export function useBubbleDrift(
  rootRef: React.RefObject<HTMLElement | null>,
  options: { gsap?: unknown; ScrollTrigger?: unknown; maxDrift?: number } = {}
) {
  const { gsap, ScrollTrigger, maxDrift } = options;
  useEffect(() => {
    if (!rootRef.current) return;
    const handle = createBubbleDrift(rootRef.current, { gsap, ScrollTrigger, maxDrift } as never);
    return () => handle.destroy();
  }, [rootRef, gsap, ScrollTrigger, maxDrift]);
}
