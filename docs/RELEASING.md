# Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning:

1. `pnpm changeset` — describe your change, pick a bump (patch/minor/major).
2. Push and merge your PR as usual. CI (`.github/workflows/ci.yml`) checks that a changeset is
   present.
3. On merge to `main`, `.github/workflows/release.yml` opens/updates a "Version Packages" PR
   that bumps `package.json`, `src-tauri/Cargo.toml` and the changelog.
4. Merging that PR tags the release and builds signed-less installers for Windows, macOS and
   Linux, attached to a draft GitHub Release.

## Flatpak

Every release also gets a `.flatpak` bundle, built from [`flatpak/com.mateusf.Sockety.yml`]
(../flatpak/com.mateusf.Sockety.yml) by the `flatpak-sources`/`flatpak`/`flatpak-release`
jobs in `release.yml`. Flathub requires building from source with no network access during the
build, so the manifest vendors every cargo/pnpm dependency as a source instead of installing them
normally; `scripts/flatpak-sources.sh` (`pnpm flatpak:sources`) regenerates that list from the
current lockfiles right before each build - it's not committed, since Renovate updates the
lockfiles constantly (see the comment at the top of that script for why).

To build and test it locally:

```bash
pnpm flatpak:sources
flatpak install flathub org.gnome.Sdk//51 \
  org.freedesktop.Sdk.Extension.node24//26.08 org.freedesktop.Sdk.Extension.rust-stable//26.08 \
  org.flatpak.Builder
flatpak run org.flatpak.Builder --force-clean --user --install --install-deps-from=flathub \
  --repo=repo flatpak/build-dir flatpak/com.mateusf.Sockety.yml
flatpak run com.mateusf.Sockety
```

Sockety isn't on Flathub yet. Listing it there is a separate, one-time submission to
[flathub/flathub](https://github.com/flathub/flathub) using a `git`-source copy of this manifest,
not something CI does; once accepted, Flathub's own buildbot rebuilds it from source on every
update via a `flathub` job added to [flathub/com.mateusf.Sockety](https://github.com/flathub/com.mateusf.Sockety)
for each new tag.
