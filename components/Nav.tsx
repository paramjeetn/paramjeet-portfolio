"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/work", label: "work" },
  { href: "/writing", label: "writing" },
  { href: "/now", label: "now" },
  { href: "/stack", label: "stack" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          height: 52,
        }}
      >
        {links.map(({ href, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: "0.875rem",
                color: active ? "var(--fg)" : "var(--muted)",
                textDecoration: "none",
                fontWeight: active ? 500 : 400,
                transition: "color 0.15s",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
