#!/bin/bash

npm install -g gulp

gulp
cd dist
git init
git config user.name "yes-bot"
git config user.email "yes-bot@users.noreply.github.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
