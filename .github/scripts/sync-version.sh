#!/usr/bin/env bash
# Propagates the version release-plz just wrote to Cargo.toml into the other
# places that carry it: meson.build's project() call and the AppStream
# metainfo release history. release-plz only knows about Cargo.toml/
# CHANGELOG.md, so this fills the gap after `release-plz update` runs.
set -euo pipefail

cd "$(dirname "$0")/../.."

version=$(sed -n 's/^version = "\(.*\)"/\1/p' Cargo.toml | head -n1)
date=$(date +%Y-%m-%d)
metainfo="data/com.mateusf.sockety.metainfo.xml.in.in"

if [ -z "$version" ]; then
  echo "Could not read version from Cargo.toml" >&2
  exit 1
fi

sed -i "s/^  version: '[^']*'/  version: '${version}'/" meson.build

if ! grep -q "<release version=\"${version}\"" "$metainfo"; then
  sed -i "s#  <releases>#  <releases>\n    <release version=\"${version}\" date=\"${date}\" />#" "$metainfo"
fi

echo "version=${version}"
