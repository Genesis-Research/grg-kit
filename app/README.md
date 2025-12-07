# GRG Kit Showcase App

The showcase application for GRG Kit - displays themes, components, blocks, and spartan-ng examples.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run start
# or
ng serve
```

Open `http://localhost:4200/` in your browser.

## Building

```bash
pnpm run build
```

Build artifacts are stored in `dist/app/`.

## Structure

- **Getting Started** - Setup instructions for CLI and MCP server
- **Spartan Components** - 56+ spartan-ng component examples
- **GRG Components** - Custom components (stepper, file-upload)
- **Blocks** - Page blocks (auth, shell, settings)
- **Colors** - Theme color palettes
- **Typography** - Text styling examples

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm run start` | Start dev server |
| `pnpm run build` | Build for production |
| `pnpm run generate:sources` | Generate source code for examples |
