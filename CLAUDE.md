# Project: Tomás González — Hugo Site

Hugo static site for tomasjgonzalez.com. Theme: hc-starter.

## Stack
- Hugo, Netlify
- Config: `config.toml`, `config.development.toml`, `config.production.toml`

## Key paths
- `content/` — Markdown (writing, portfolio, newsletter)
- `layouts/` — Templates and partials
- `themes/hc-starter/` — Theme source
- `data/` — Site data (e.g. signup settings)

## Conventions
- Hugo templating: `{{ .Params }}`, `{{ .Site.Data }}`, `{{ partial "..." . }}`
- Layout utilities: `region`, `flow`, `switcher`
- Few comments; precise code
