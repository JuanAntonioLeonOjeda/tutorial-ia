#!/bin/sh
# Builds the downloads the lessons link to, in public/descargas/:
# - one zip per example skill in material/skills/ (a folder with SKILL.md, as claude.ai expects);
# - espacio-direccion.zip, the workspace template for Claude Code, with a fresh copy of the
#   acta-de-reunion skill so both downloads stay identical.
set -eu
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/public/descargas"
mkdir -p "$out"

cd "$root/material/skills"
for dir in */; do
  name="${dir%/}"
  rm -f "$out/$name.zip"
  zip -qrX "$out/$name.zip" "$name"
  echo "public/descargas/$name.zip"
done

cp "$root/material/skills/acta-de-reunion/SKILL.md" \
  "$root/material/espacio-direccion/.claude/skills/acta-de-reunion/SKILL.md"
cd "$root/material"
rm -f "$out/espacio-direccion.zip"
zip -qrX "$out/espacio-direccion.zip" espacio-direccion -x '*.DS_Store'
echo "public/descargas/espacio-direccion.zip"
