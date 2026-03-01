# nareshjois.com

Personal website and blog for Naresh Jois.

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://react.dev) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Motion](https://motion.dev) - Animations
- [MDX](https://mdxjs.com) - Content authoring

## Project Structure

```
├── public/           # Static assets
├── src/
│   ├── components/   # Astro and React components
│   ├── content/      # Blog posts (MDX/Markdown)
│   ├── layouts/      # Page layouts
│   ├── pages/        # Route pages
│   └── consts.ts     # Site configuration
├── astro.config.mjs
└── package.json
```

## Development

```sh
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## License

All rights reserved.
