---
description:
  This is where you can adjust all of the **global** settings for your project. Changes saved here are instantly
  reflected throughout the platform.
readTime: 4 min read
---

# Project Settings

> This is where you can adjust all of the **global** settings for your project, such as project name, default language,
> custom CSS, password policies, _and more!_ Changes saved here are instantly reflected throughout your project.

:::tip Learn More

To manage your project settings programmatically, see our API documentation on [settings](/reference/system/settings).

:::

## Configure Project Settings

To configure Project Settings, follow these steps.

1. Navigate to **Settings > Project Settings**.
2. Configure settings as desired.
3. Click <span mi btn>check</span> to confirm.

All configuration options are described in detail below.

## General

- **Project Name** — Sets the name on the [Navigation Bar](/app/overview.html#_2-navigation-bar), as well as login and
  public pages.
- **Project Descriptor** — Sets the descriptor shown below the Project Name.
- **Project URL** — Sets URL when clicking the logo at the top of the [Module Bar](/app/overview.html#_1-module-bar).
- **Default Language** — Sets the default language used within the app.

## Branding & Style

- **Project Color** — Sets color on the project logo, FavIcon and login/public pages.
- **Project Logo** — Adds a 40x40px logo at the top of the [Module Bar](/app/overview.html#_1-module-bar) and on the
  login/public pages. The image is inset within a 64x64px square filled with the project color. We recommend using a PNG
  file for optimal compatibility.
- **Public Foreground** — Adds image on the public page's right-pane _(max-width 400px)_.
- **Public Background** — Adds image displayed behind the public foreground image, shown full-bleed within the public
  page's right-pane. When a public background image is not set, the project color is used instead.
- **Public Note** — A helpful note displayed at the bottom of the public page's right-pane, supports markdown for
  rich-text formatting.
- **Custom CSS** — Applies custom CSS rules to override the Data Studio's default styling. Be aware that the Data
  Studio's core code, and therefore its DOM selectors, can change at any time. These updates are not considered a
  breaking change.

::: tip Browser FavIcon & Title

The Project Color is also used to set a dynamic FavIcon and the Project Name is used in the browser's page title, making
it easier to identify different Directus projects.

:::

## Modules

- **Module Bar** — Allows the following customization of links displayed in the
  [Module Bar](/app/overview.html#_1-module-bar).
  - **Toggle Visibility** — Toggle <span mi icon>check_box_outline_blank</span> to set module link visibility in the
    Navigation Bar.
  - **Manually Sort Modules** — Click <span mi icon>drag_handle</span> and drag to reorder module links as desired.
  - **Add Link** — To add a new custom link, click **Add Link** and fill in the details below.
    - **Name** — Sets the title of the module link, also shown in a tooltip on hover.
    - **Icon** — Selects an icon for the module button.
    - **URL** — Should start with a `/` for links within the [Directus Data Studio](/app/overview).

## Security

- **Auth Password Policy** — Sets a policy requirement for all user's passwords via a JavaScript regex. Supports the
  following options:
  - **None** — Not recommended.
  - **Weak** — Minimum of 8 characters.
  - **Strong** — Uppercase, lowercase, numbers, and special characters.
  - **Other** — Set custom policy with JavaScript regex.
- **Auth Login Attempts** — Sets the number of failed login attempts allowed before a user's account is locked. Once
  locked, an Admin user is required to unlock the account.

## Files & Storage

The platform's file middleware allows for cropping and transforming image assets on the fly. This means you can simply
request an original image, include any desired parameters, and you'll be served the new asset as a response.

To help stop malicious users from using up your storage by requesting a large number of random sizes, you can use the
following options to limit what transformations are possible.

- **Allowed Transformations** — For enabling, disabling, or limiting image transformations.
- **Default Folder** — Sets the default folder where new assets are added. This does not affect existing files. Be aware
  that fields may override this value.
- **Transformation Presets** — Sets a specific image transformation configuration to simplify requests or limit usage.
  - **Key** — Sets unique identifier allowing faster and easier image transformation requests.
  - **Fit** — Contain _(keeps aspect ratio)_, Cover _(exact size)_, Fit Inside, or Fit Outside.
  - **Width** — Sets the width of the image.
  - **Height** — Sets the height of the image.
  - **Quality** — Adjusts the compression or quality of the image.
  - **Upscaling** — When enabled, images won't be upscaled.
  - **Format** — Changes the output format.
  - **Additional Transformations** — Adds additional transformations using
    [Sharp](https://sharp.pixelplumbing.com/api-constructor).

:::tip How to Use Transformation Presets

To learn more, please see the API guide on [transformation presets](/reference/files.html#preset-transformations).

:::

## Mapping

- **Mapbox Access Token** — Create a [Mapbox Access Token](https://docs.mapbox.com/help/glossary/access-token) and enter
  it here to improve the platform's mapping experience.
- **Basemaps** — Click **Create New** to set a custom tile configuration that overrides the Mapbox defaults.
  - **Name** — Sets a custom name to identify the basemap preset.
  - **Type** — Sets tile type. Choose from Raster, Raster TileJSON, or Mapbox Style.
  - **Tile Size** — Sets a tile size (in pixels).
  - **URL** — Sets the URL to request your tiles from.
  - **Attribution** — Sets attribution information.

## Image Editor

- **Custom Aspect Ratios** — Adds custom aspect ratios in the [image editor](/app/file-library#edit-an-image).
  - **Text** — Sets a name to identify the aspect ratio.
  - **Value** — Sets the aspect ratio with a fraction.

For example, if you want a 16:10 aspect ratio, you would type in `1.6`, which is derived from 16/10, which equals 1.6.
If the intended aspect ratio is 16:9, the value would be 16 divided by 9, rounded to 1.7778.
