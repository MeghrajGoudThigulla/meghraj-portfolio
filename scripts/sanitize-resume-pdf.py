#!/usr/bin/env python3
"""
Sanitizes the PDF resume to:
1. Purge PII (phone number, WhatsApp URL) from text and link annotations.
2. Align public project name to 'TFG SecureBank'.
3. Soften security claims to 'tamper-evident'.
4. Remove broken/dead link annotations.
5. Center remaining active contact links across the header.
"""

import sys
import os
import pymupdf

def sanitize_pdf(input_path: str, output_path: str):
    if not os.path.exists(input_path):
        print(f"Error: input file {input_path} does not exist", file=sys.stderr)
        sys.exit(1)

    doc = pymupdf.open(input_path)
    page1 = doc[0]

    # 1. Redact top contact row entirely (from y=50 to y=70 across full width)
    top_strip = pymupdf.Rect(30, 50, 582, 70)
    page1.add_redact_annot(top_strip, fill=(1, 1, 1))

    # 2. Delete all existing top link annotations from page 1
    for l in list(page1.get_links()):
        if l["from"].y0 < 75:
            page1.delete_link(l)

    # 3. Redact TFG SecureBanking -> TFG SecureBank
    sb = page1.search_for("TFG SecureBanking")
    if sb:
        page1.add_redact_annot(sb[0], fill=(1, 1, 1))

    # 4. Redact tamper-proof bullet line
    bullet_line = page1.search_for("Generated tamper-proof loan agreement PDFs with WeasyPrint and Jinja2 templates.")
    if bullet_line:
        page1.add_redact_annot(bullet_line[0], fill=(1, 1, 1))

    page1.apply_redactions()

    # 5. Insert new centered contact row
    items = [
        ("meghraj.thigulla@outlook.com", "mailto:meghraj.thigulla@outlook.com"),
        ("LinkedIn", "https://www.linkedin.com/in/meghraj-goud-thigulla"),
        ("Portfolio", "https://meghraj-portfolio.web.app/"),
        ("GitHub", "https://github.com/MeghrajGoudThigulla"),
        ("Certificates", "https://linktr.ee/meghraj_goud_thigulla"),
    ]

    spacing = 16.0
    total_w = sum(pymupdf.get_text_length(t, fontname="times-roman", fontsize=10.9091) for t, _ in items) + spacing * (len(items) - 1)
    cur_x = (612 - total_w) / 2
    baseline_y = 64.0

    for text, uri in items:
        w = pymupdf.get_text_length(text, fontname="times-roman", fontsize=10.9091)
        page1.insert_text(
            pymupdf.Point(cur_x, baseline_y),
            text,
            fontsize=10.9091,
            fontname="times-roman",
            color=(0, 0, 1),
        )
        link_rect = pymupdf.Rect(cur_x, baseline_y - 9.5, cur_x + w, baseline_y + 2.0)
        page1.insert_link({"kind": pymupdf.LINK_URI, "from": link_rect, "uri": uri})
        cur_x += w + spacing

    # 6. Re-insert TFG SecureBank in bold
    if sb:
        page1.insert_text(
            pymupdf.Point(sb[0].x0, sb[0].y1 - 2.5),
            "TFG SecureBank",
            fontsize=10.9091,
            fontname="times-bold",
            color=(0, 0, 0),
        )

    # 7. Re-insert tamper-evident bullet line
    if bullet_line:
        page1.insert_text(
            pymupdf.Point(bullet_line[0].x0, bullet_line[0].y1 - 2.5),
            "Generated tamper-evident loan agreement PDFs with WeasyPrint and Jinja2 templates.",
            fontsize=10.9091,
            fontname="times-roman",
            color=(0, 0, 0),
        )

    # 8. Page 2: Remove dead groconnect link annotation
    if len(doc) > 1:
        page2 = doc[1]
        for l in list(page2.get_links()):
            if "groconnect" in l.get("uri", "").lower():
                page2.delete_link(l)

    doc.save(output_path)
    print(f"Sanitized PDF saved successfully to {output_path}")

if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else "/home/thigulla-meghraj-goud/Downloads/Thigulla_Meghraj_Goud_Résumé.pdf"
    dest = sys.argv[2] if len(sys.argv) > 2 else "portfolio-frontend/public/Thigulla_Meghraj_Goud_Resume.pdf"
    sanitize_pdf(src, dest)
