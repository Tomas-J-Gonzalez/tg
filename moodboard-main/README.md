# mood.harrycresswell.com

A moodboard of things I like.

**Theme**: https://github.com/harrycresswell/mood.git

## Updating Git Submodule (the theme) to latest

The following will fetch the latest changes from upstream in each submodule, merge them in, and check out the latest revision of the submodule.

```
git submodule update --remote --merge
```

Ensure you replace your existing `assets` folder with the one found in `themes/mood`.

Now commit and push your changes, as normal.