export type NavItem = {
  href: string;
  label: string;
  group: "section" | "external" | "primary";
  isExternal?: boolean;
};

export const navItems: NavItem[] = [
  { href: "#about", label: "About", group: "section" },
  { href: "#services", label: "Services", group: "section" },
  { href: "#projects", label: "Projects", group: "section" },
  { href: "#journey", label: "Experience", group: "section" },
  { href: "#skills", label: "Capabilities", group: "section" },
  {
    href: "https://github.com/MeghrajGoudThigulla",
    label: "GitHub",
    group: "external",
    isExternal: true,
  },
  { href: "/resume", label: "Resume", group: "primary" },
];

export const MOBILE_NAV_CTA = {
  href: "/#contact",
  label: "Let's Connect",
};

export const navSectionIds = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));
