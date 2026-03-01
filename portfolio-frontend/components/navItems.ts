export type NavItem = {
  href: string;
  label: string;
  group: "section" | "external" | "primary";
  isExternal?: boolean;
};

export const navItems: NavItem[] = [
  { href: "#about", label: "About", group: "section" },
  { href: "#skills", label: "Skills", group: "section" },
  { href: "#cases", label: "Case Studies", group: "section" },
  { href: "#roi", label: "ROI", group: "section" },
  { href: "#contact", label: "Contact", group: "section" },
  {
    href: "https://github.com/MeghrajGoudThigulla",
    label: "GitHub",
    group: "external",
    isExternal: true,
  },
  { href: "/resume", label: "Resume", group: "primary" },
];

export const navSectionIds = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));
