#!/bin/bash

npm install -g gulp
cp app/js/config.json.sample app/js/config.json
sed -i -e 's/"imgur_client_id": ""/"imgur_client_id": "f0972432933fc36"/g' app/js/config.json
gulp
cd dist
git init
git config user.name "yes-bot"
git config user.email "yes-bot@users.noreply.github.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
