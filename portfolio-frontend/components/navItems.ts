export type NavItem = {
  href: string;
  label: string;
  isExternal?: boolean;
};

export const navItems: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#cases", label: "Case Studies" },
  { href: "#roi", label: "ROI" },
  { href: "#contact", label: "Contact" },
  {
    href: "https://github.com/MeghrajGoudThigulla",
    label: "GitHub",
    isExternal: true,
  },
  { href: "/resume", label: "Resume" },
];

export const navSectionIds = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));
