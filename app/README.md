# GRG Kit Showcase App

The showcase application for GRG Kit - displays themes, components, blocks, and spartan-ng examples.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run start
# or
ng serve
```

Open `http://localhost:4200/` in your browser.

## Building

```bash
npm run build
```

Build artifacts are stored in `dist/app/`.

## Structure

- **Getting Started** - Setup instructions for CLI and MCP server
- **Spartan Components** - 56+ spartan-ng component examples
- **GRG Components** - Custom components (file-upload)
- **Blocks** - Page blocks (auth, shell, settings)
- **Colors** - Theme color palettes
- **Typography** - Text styling examples

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start dev server |
| `npm run build` | Build for production |
| `npm run codegen` | Generate all source code (blocks, components, grg) |
| `npm run codegen:blocks` | Generate block source code only |
| `npm run codegen:components` | Generate component source code only |
| `npm run codegen:grg` | Generate GRG component source code only |
