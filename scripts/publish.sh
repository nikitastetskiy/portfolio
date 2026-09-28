#!/usr/bin/env bash
# Build and publish the existing user site. All Node tooling stays in Docker.
set -eu
cd "$(dirname "$0")/.."
if [ -n "$(git status --porcelain)" ]; then
  printf '%s\n' 'Commit or resolve working-tree changes before publishing.' >&2
  exit 1
fi
portfolio_publish_dir=$(mktemp -d "${TMPDIR:-/tmp}/portfolio-publish.XXXXXX")
trap 'rm -rf "$portfolio_publish_dir"' EXIT HUP INT TERM
source_commit=$(git rev-parse HEAD)
canonical_name='Nikita Stetskiy'
canonical_email='42643697+nikitastetskiy@users.noreply.github.com'
docker build -f compose/Dockerfile --target export --output "type=local,dest=$portfolio_publish_dir/site" .
git clone --quiet --branch master --single-branch git@github.com:nikitastetskiy/nikitastetskiy.github.io.git "$portfolio_publish_dir/repo"
git -C "$portfolio_publish_dir/repo" config user.name "$canonical_name"
git -C "$portfolio_publish_dir/repo" config user.email "$canonical_email"
# Replace generated output while preserving repository configuration and custom domains.
git -C "$portfolio_publish_dir/repo" ls-files -z | while IFS= read -r -d '' file; do
  case "$file" in CNAME|.github/*|.mailmap) ;; *) rm -f "$portfolio_publish_dir/repo/$file" ;; esac
done
cp -R "$portfolio_publish_dir/site/." "$portfolio_publish_dir/repo/"
cp .mailmap "$portfolio_publish_dir/repo/.mailmap"
printf '{"sourceCommit":"%s"}\n' "$source_commit" > "$portfolio_publish_dir/repo/version.json"
git -C "$portfolio_publish_dir/repo" add --all
if git -C "$portfolio_publish_dir/repo" diff --cached --quiet; then
  printf '%s\n' 'Published files already match this build.'
else
  git -C "$portfolio_publish_dir/repo" commit -m "Publish portfolio from $source_commit"
  git -C "$portfolio_publish_dir/repo" push origin master
fi
printf '%s\n' 'Published to https://nikitastetskiy.github.io/ (GitHub Pages may take a few minutes).'
