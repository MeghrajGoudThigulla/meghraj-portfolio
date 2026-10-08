export type StrengthItem = {
  title: string;
  detail: string;
};

export const STRENGTHS: StrengthItem[] = [
  {
    title: "Adaptive R&D",
    detail: "Start with the problem, research unfamiliar territory, and choose a practical path before committing to implementation.",
  },
  {
    title: "System Debugging",
    detail: "Work through difficult backend, infrastructure, deployment, integration, and production failures until the system is usable again.",
  },
  {
    title: "Product Context",
    detail: "Understand the workflow behind a feature instead of treating every requirement as an isolated ticket.",
  },
  {
    title: "Knowledge Transfer",
    detail: "Make complex systems easier for new teammates through practical walkthroughs, documentation, and hands-on KT.",
  },
];

export const PRINCIPLES: [string, string][] = [
  ["Understand before building", "Start with the workflow, constraints, and the actual problem."],
  ["Use AI for leverage", "Automate repetitive cognitive work while keeping engineering judgment human-led."],
  ["Make the environment easier", "Clear communication and useful KT are part of shipping good software."],
];

export const ABOUT_CONTENT = {
  eyebrow: "PROFILE",
  title: "An adaptive engineer who makes difficult technical work easier to move through.",
  description: "I work across AI/ML, backend systems, Flutter, infrastructure, and product R&D. I learn unfamiliar systems quickly, debug what breaks, and try to make the working environment easier for the people around me.",
  leadParagraph: "I usually start with a client or stakeholder conversation, then move into R&D. Once I understand the constraints, I prefer to build the smallest practical solution, debug the hard parts, and keep improving it after it reaches production.",
};
