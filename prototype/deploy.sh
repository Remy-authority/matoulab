#!/usr/bin/env bash
# Déploiement Matoulab sur Cloudflare Pages (gratuit, *.pages.dev).
# Prérequis : token API Cloudflare (portée Pages:Edit) + Account ID, fournis par Rémy.
# Usage :
#   CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=yyy ./deploy.sh
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?token manquant}"
: "${CLOUDFLARE_ACCOUNT_ID:?account id manquant}"
PROJECT="${PROJECT:-matoulab}"

echo "→ build"
npm run build

echo "→ création du projet Pages (ignore l'erreur s'il existe déjà)"
npx wrangler pages project create "$PROJECT" --production-branch main 2>/dev/null || true

echo "→ déploiement de dist/"
npx wrangler pages deploy dist --project-name "$PROJECT" --branch main

echo "✓ Déployé. URL : https://${PROJECT}.pages.dev"
