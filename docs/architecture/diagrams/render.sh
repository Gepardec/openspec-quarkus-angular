#!/usr/bin/env bash
# Erzeugt alle Diagramme aus structurizr/workspace.dsl neu.
# Voraussetzung: structurizr (CLI) und plantuml im PATH.
set -euo pipefail
cd "$(dirname "$0")"
structurizr validate -workspace structurizr/workspace.dsl
rm -f ./*.puml ./*.svg
tmp=$(mktemp -d)
structurizr export -workspace structurizr/workspace.dsl -format plantuml -output "$tmp" >/dev/null
for key in context containers components-spa-animals components-api runtime-tier-anlegen deployment-lokal; do
  case "$key" in
    context) sec=03 ;;
    containers|components-*) sec=05 ;;
    runtime-*) sec=06 ;;
    deployment-*) sec=07 ;;
  esac
  [ -f "$tmp/structurizr-$key.puml" ] || continue
  cp "$tmp/structurizr-$key.puml" "$sec-$key.puml"
done
rm -rf "$tmp"
plantuml -tsvg ./*.puml
