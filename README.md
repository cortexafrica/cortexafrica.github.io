# Served — la page de l'audit gratuit

La landing page de l'audit gratuit de Cortex Africa. Deuxième création du skill
`premium-web-studio`, et la première faite pour nous-mêmes.

## Ce qu'elle a de particulier

**Elle reproduit un défaut en direct.** Le bloc de démonstration compose la même
phrase deux fois, avec les deux vrais fichiers de police d'un site en
production : celui qu'il croyait servir, et celui qu'il servait. Rien n'est
simulé, rien n'est une capture. `public/fonts/preuve-archivo-*.woff2`.

Le fichier fautif ne couvrait aucune lettre de cette phrase — seulement ses
trois espaces. Le navigateur téléchargeait 13 Ko de police pour s'en servir
entre les mots.

**Aucune image générée.** Le principe de cette page est qu'elle est sa propre
preuve : une page qui vend « on vérifie ce qui est réel » ne peut pas être
illustrée d'images fabriquées. L'image de partage est composée avec la police
réellement servie.

## Construire

```bash
npm install
npm run build
npm run preview -- --port 4300
```

## La porte, avant tout déploiement

```bash
python3 ~/.claude/skills/premium-web-studio/scripts/preflight.py \
        http://localhost:4300/ --dist dist \
        --facts ../studio/facts.json --market us --out ../studio/review
```

Elle refuse de rendre la main tant qu'un contrôle échoue. **Cette page a fait
apparaître six défauts de la porte elle-même** — un contrôle qui exigeait une
mention légale pendant qu'un autre en refusait l'année, une devise signalée
parce que la page *parle* d'un défaut de devise, un piège à robots pris pour une
cible tactile. Tous corrigés dans le skill, pas contournés ici.

## Ce qui n'est pas dans ce dépôt

Le dossier `studio/` — brief, registre des chiffres, journal, revues — reste
privé. Il contient le raisonnement, pas le livrable.

## À faire

- Acheter `served.report` et basculer les URL (canonique, og, sitemap, 404).
- La fonction serveur `audit` qui reçoit les demandes n'existe pas encore : le
  formulaire pointe dessus et échouera proprement tant qu'elle n'est pas là.
