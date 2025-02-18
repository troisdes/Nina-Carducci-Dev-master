# Roadmap pour la Finalisation des Modifications

## 1. Contraste des Couleurs

- Vérifier et ajuster les combinaisons texte/fond à l'aide d’un outil comme le [Contrast Checker de WebAIM](https://webaim.org/resources/contrastchecker/).
- Modifier les règles CSS dans `/assets/style.css` où les couleurs sont définies pour assurer un ratio d'au moins 4,5:1 pour le texte normal et 3:1 pour le texte large.

## 2. Utilisation de Repères de Page (Landmarks)

- Remplacer certaines `<div>` génériques par des balises HTML5 sémantiques comme `<header>`, `<nav>`, `<main>` et `<footer>`.
- Ajouter éventuellement des attributs ARIA (ex. `role="main"`) pour clarifier la fonction des zones dans `/home/troisdes/dev/P4/Nina-Carducci-Dev-master/index.html`.

## 3. Hiérarchie des Titres (Headings)

- Vérifier que la page comporte un `<h1>` unique pour le titre principal.
- Organiser les `<h2>`, `<h3>`, etc. de manière cohérente afin de structurer logiquement le contenu dans le fichier HTML (`index.html`).

## 4. Amélioration des Formulaires et des Labels

- S'assurer que chaque champ de formulaire possède un `<label>` associé via l'attribut `for` ou des attributs ARIA pertinents.
- Vérifier et corriger, le cas échéant, les formulaires dans le fichier `index.html`.

## 5. Revue des Attributs ARIA

- Examiner l’utilisation d’attributs comme `aria-hidden` pour s'assurer qu'ils ne masquent pas d’informations essentielles.
- Réajuster ou supprimer ces attributs si nécessaire dans `index.html`.

## 6. Texte Alternatif pour les Images

- Vérifier que toutes les images importantes possèdent un attribut `alt` descriptif adéquat.
- Pour les images décoratives, utiliser `alt=""`.
- Effectuer ces modifications dans le fichier `index.html`.

## 7. Tests d’Accessibilité et Ajustements Finaux

- Utiliser des outils comme WAVE, axe ou Lighthouse pour détecter d’éventuels problèmes résiduels.
- Tester manuellement l’accessibilité avec un lecteur d’écran pour vérifier la navigation et la compréhension des contenus.

## 8. Validation et Déploiement

- Une fois toutes les modifications effectuées, valider le rendu sur différents navigateurs et dispositifs.
- Mettre à jour la documentation du projet concernant les ajustements d’accessibilité.
- Intégrer les changements dans la branche principale en vue du déploiement final.
