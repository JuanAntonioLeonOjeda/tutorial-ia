import type { ComponentPropsWithoutRef, ReactNode } from "react";

const BASE = import.meta.env.BASE_URL;

/** Prefixes root-relative paths with the deploy base, so `/descargas/x.zip` works under Pages. */
export function withBase(href: string, base: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return `${base.replace(/\/$/, "")}${href}`;
}

/**
 * Links in lessons. Internal files (`/descargas/…`) get the deploy base and download on click;
 * external links open in a new tab.
 */
export function LessonLink({
  href = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">): ReactNode {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  const isDownload = href.startsWith("/descargas/");
  return (
    <a href={withBase(href, BASE)} download={isDownload || undefined} {...rest}>
      {children}
    </a>
  );
}
