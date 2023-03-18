# RARS for Flatpak

[RARS (RISC-V Assembler and Runtime Simulator)](https://github.com/TheThirdOne/rars) created by [Benjamin Landers](https://github.com/TheThirdOne) packaged for [Flatpak](https://flatpak.org)

## Documentation

### Installation
1. [Install Flatpak (with the Flathub repository)](https://flatpak.org/setup)
2. Install RARS:
```shell
flatpak install flathub io.github.TheThirdOne.rars
```
3. Run RARS either from your desktop environment or from the command line:
```shell
flatpak run io.github.TheThirdOne.rars
```

### File System Access
By default, RARS will only have access to the Desktop and Documents folders. To grant access to
other folders, run:
```shell
flatpak override io.github.TheThirdOne.rars --user --filesystem=[Type/path]
```
See the [Flatpak documentation](https://docs.flatpak.org/en/latest/sandbox-permissions.html#filesystem-access)
for more information.

### Environment Variables

Name | Default | Description
--- | --- | ---
`RARS_JAVA` | None | Passes arguments directly to the Java command (Will override other environment variables)
`RARS_SCALE` | Screen width / `1920` | Sets the `sun.java2d.uiScale` property (See documentation [here](https://news.kynosarges.org/2019/03/24/swing-high-dpi-properties/))

### Development
1. Install Flatpak (See [this](https://flatpak.org/setup/) guide)
2. Install Flatpak builder (`flatpak-builder`; see [this](https://docs.flatpak.org/en/latest/first-build.html) guide)
3. Install dependencies:
```shell
flatpak install org.freedesktop.Sdk org.freedesktop.Sdk.Extension.openjdk17 org.freedesktop.appstream-glib 
```
4. Build:
```shell
flatpak-builder build io.github.TheThirdOne.rars.yml --force-clean
```
5. Install:
```shell
flatpak-builder --user --install --force-clean build io.github.TheThirdOne.rars.yml
```
6. Test:
```shell
flatpak run io.github.TheThirdOne.rars
flatpak run io.github.TheThirdOne.rars h
RARS_SCALE=3.0 flatpak run io.github.TheThirdOne.rars
RARS_JAVA=bad-argument flatpak run io.github.TheThirdOne.rars
```
7. Validate metadata:
```shell
flatpak run org.freedesktop.appstream-glib validate io.github.TheThirdOne.rars.metainfo.xml
desktop-file-validate io.github.TheThirdOne.rars.desktop
```

## License

* The RARS logo is under the [MIT license](https://github.com/TheThirdOne/rars/blob/master/License.txt).