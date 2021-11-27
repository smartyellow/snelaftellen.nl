# SvelteKit template

Preconfigured SvelteKit template with:

- GitHub Actions for linting, building and CodeQL
- Dependabot
- VS Code configuration files
- `.nvmrc`
- [Netlify configuration](#netlify)
- TypeScript support

## Download

Multiple options:

- Use the GitHub template by clicking _Use this template_.
- [Download the tarball](https://github.com/garraflavatra/sveltekit-template/tarball/main).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

Or start the server and open the app in a new browser tab:

```bash
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Netlify

1. Install the `@sveltejs/adapter-netlify` with your package manager.
2. Add `import netlify from '@sveltejs/adapter-netlify';` to `svelte.config.js`.
3. Uncomment the adapter line in the Svelte config file.
4. Add `/.netlify` to `.gitignore`.
