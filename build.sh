#!/bin/bash
set -e

# Variables
project_name="Snippets"
html_file="src/html/index.html"
svg_file="src/svg/icon.svg"
css_file="src/css/styles.css"
js_file="src/js/scripts.js"
server_json="srv/server.json"
server_user="universmc"
server_ip="192.168.1.33"
server_path="/var/www/html"

# Vérifier si un nom de projet est passé en argument
if [ "$#" -eq 1 ]; then
  project_name="$1"
fi

# Créer les répertoires
mkdir -p src/html src/svg src/css src/js srv

# Créer les fichiers
touch "$html_file" "$svg_file" "$css_file" "$js_file" "$server_json"

# Initialiser un projet npm
if [ ! -d "package" ]; then
  git clone --depth 1 https://github.com/universmc/package
fi
node run.js

# Créer un fichier .gitignore
echo "node_modules" >> .gitignore
echo "build" >> .gitignore
echo ".vscode" >> .gitignore

# Incrémente la version
npm version patch

# Commit et push
git add package.json
git commit -m "Mise à jour de la version"
git push origin main

# Copie des fichiers vers le serveur
scp index.html style.min.css scripts.min.js ico.svg readme.md "$server_user@$server_ip:$server_path"

# Redémarrage du serveur
ssh "$server_user@$server_ip" "node serveur.js"

echo "Projet $project_name créé avec succès !"