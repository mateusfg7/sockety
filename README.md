<!-- FIXME Uncomment once published at Flathub -->
<!-- <a href="https://flathub.org/apps/details/com.mateusf.sockety"> -->
<!-- <img src="https://flathub.org/api/badge?svg&locale=en&light" width="190px" /> -->
<!-- </a> -->

<div align="center">
  <img src="data/icons/com.mateusf.sockety.svg" width="128" height="128" alt="Sockety icon" />

  # Sockety

  A native GNOME client for testing Socket.IO servers: connect, emit events
  and inspect what comes back, without a browser-based tool.
</div>

> **Status:** Sockety is in early development. The app currently scaffolds a
> GNOME/GTK4 window; Socket.IO connection and event features are not
> implemented yet.

## Building from source

Sockety is a GTK4/libadwaita app written in Rust, built with Meson. The
easiest way to build and run it is with [GNOME Builder](https://apps.gnome.org/Builder/):

1. Open GNOME Builder.
2. Select **Clone Repository** and use `https://github.com/mateusfg7/sockety.git`.
3. Click **Run** (▶) to build and launch the Flatpak-sandboxed development build.

You can also build manually with Meson if you have the required dependencies
installed (`glib-2.0 >= 2.66`, `gio-2.0 >= 2.66`, `gtk4 >= 4.20`,
`libadwaita-1 >= 1.8`, and a Rust toolchain via `cargo`):

```sh
meson setup builddir
meson compile -C builddir
meson install -C builddir
```

For general background on building GNOME apps with Flatpak and GNOME
Builder, see the [GNOME getting started guide](https://developer.gnome.org/documentation/tutorials/beginners/getting_started.html).

## Contributing

Issues and pull requests are welcome at
[github.com/mateusfg7/sockety](https://github.com/mateusfg7/sockety).

<!-- FIXME Uncomment once available at Damned Lies -->
<!-- ## Translations -->

<!-- Helping to translate Sockety or add support to a new language is very -->
<!-- welcome. You can find everything you need at: -->
<!-- [l10n.gnome.org/module/sockety/](https://l10n.gnome.org/module/sockety/) -->

## Code of Conduct

This project follows the [GNOME Code of Conduct](https://conduct.gnome.org/).
