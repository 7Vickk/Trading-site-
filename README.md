# TR Dashboard — Trade Republic en temps réel

Tableau de bord connecté à Trade Republic avec notifications de marché en temps réel.

## Stack

| Couche | Technologies |
|---|---|
| Frontend | React 18 + TypeScript + Vite + TailwindCSS + Recharts |
| Backend | Node.js + Express + Socket.io + WebSocket |
| État | Zustand |
| Déploiement | Vercel (frontend) + Railway (backend) |

---

## Développement local

```bash
# 1. Installer toutes les dépendances
npm run install:all

# 2. Lancer frontend + backend en parallèle
npm run dev
# → Frontend : http://localhost:5173
# → Backend  : http://localhost:3001
```

---

## Déploiement en production

### Frontend sur Vercel (automatique depuis GitHub)

1. Connecter le repo GitHub à [vercel.com](https://vercel.com)
2. Vercel détecte automatiquement `vercel.json` — aucune config manuelle
3. *(Optionnel)* Ajouter la variable d'environnement :

| Variable | Valeur |
|---|---|
| `VITE_SERVER_URL` | URL du backend Railway (ex: `https://tr-backend.railway.app`) |

> Sans `VITE_SERVER_URL`, le mode démo fonctionne entièrement côté client.

### Backend sur Railway (automatique depuis GitHub)

1. Créer un nouveau projet sur [railway.app](https://railway.app)
2. Connecter ce repo GitHub → Railway détecte `railway.json`
3. Variables d'environnement Railway :

| Variable | Valeur |
|---|---|
| `PORT` | `3001` |
| `CLIENT_URL` | URL Vercel (ex: `https://tr-dashboard.vercel.app`) |

### CI/CD GitHub Actions

Le workflow `.github/workflows/deploy.yml` s'exécute à chaque push sur `main` :

- Build + type-check du frontend
- Validation syntaxique du backend
- Déploiement automatique sur Vercel

Secrets GitHub à configurer (`Settings → Secrets → Actions`) :

| Secret | Où le trouver |
|---|---|
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | vercel.com → Settings → General |
| `VERCEL_PROJECT_ID` | vercel.com → Project → Settings → General |
| `VITE_SERVER_URL` | URL Railway du backend |

---

## Fonctionnalités

- **Mode démo** — simulation client-side, aucun backend requis
- **Connexion réelle** — authentification Trade Republic (phone + PIN + 2FA SMS)
- **Notifications temps réel** — alertes de variation de prix et portefeuille
- **Graphiques interactifs** — historique des prix par position (Recharts)
- **Indices de marché** — CAC 40, DAX, S&P 500, NASDAQ, BTC, EUR/USD
