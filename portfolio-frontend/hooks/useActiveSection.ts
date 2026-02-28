"use client";

import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds: string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0 || typeof window === "undefined") {
      return;
    }

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (sectionElements.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-30% 0px -55% 0px",
      },
    );

    sectionElements.forEach((sectionElement) => observer.observe(sectionElement));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}
