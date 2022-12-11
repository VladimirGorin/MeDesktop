#!/usr/bin/env bash
mkdir build_git_data
mv build/.git build_git_data/.git
react-app-rewired build
rm build/index_ktk.html
rm build/robots_ktk.txt
mv build_git_data/.git build/.git
rm -rf build_git_data/.git
#exit
cd build
git add .
git commit -m'build'
git push jes
cd ..
