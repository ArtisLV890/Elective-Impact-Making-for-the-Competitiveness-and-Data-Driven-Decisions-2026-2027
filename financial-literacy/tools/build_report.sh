#!/usr/bin/env bash
# Build a Word report from Markdown with the project template.
# Usage (from repo root): bash financial-literacy/tools/build_report.sh <input.md> "<output.docx>"
set -euo pipefail
IN="$1"; OUT="$2"
cd "$(dirname "$0")/.."
pandoc "${IN#financial-literacy/}" --resource-path=.:research --toc --toc-depth=2 \
  --reference-doc=templates/report-template.docx -o "${OUT#financial-literacy/}"
echo "built $OUT"
