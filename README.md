# tomasjgonzalez.com

A Hugo site for [tomasjgonzalez.com](https://tomasjgonzalez.com/).

## Features

- [Hugo](https://gohugo.io/)
- [Hugo pipes](https://gohugo.io/hugo-pipes/) for SCSS, Sourcemaps and JS
- [Lazysizes.js](https://github.com/aFarkas/lazysizes) for image lazy loading
- Responsive image with [Cloudinary](https://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_javascript)
- Minimal dependencies

Read more about Hugo at [gohugo.io](https://gohugo.io/).

## Prerequisites

You need to have [Hugo](https://gohugo.io/) installed locally.

## Installation

Clone this repository:

```
git clone https://github.com/Tomas-J-Gonzalez/tg.git
```


## Local development

To start a local development server at at `https://localhost:1313/` run:

```
hugo server
```

## Production build

Whe your ready to build a production ready site, update the `baseUrl` inside `config.toml` then run:

```
hugo --cleanDestinationDir
```

This will clean the `/public` folder and run a fresh build ready for production.


### Licence information

All of the content on this site is produced under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0) license](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en).

