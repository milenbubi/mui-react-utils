# @ffilip/mui-react-utils

[![npm version](https://img.shields.io/npm/v/@ffilip/mui-react-utils.svg)](https://www.npmjs.com/package/@ffilip/mui-react-utils)
[![npm downloads](https://img.shields.io/npm/dt/@ffilip/mui-react-utils.svg)](https://www.npmjs.com/package/@ffilip/mui-react-utils)

React components and hooks. MUI utilities.

## Requirements

This library requires **React 18 or newer** and **MUI v5 or newer** to be installed in your project.

If you don’t have them already:

```bash
npm install react @mui/material
```

## Installation

with npm:

```bash
npm install @ffilip/mui-react-utils
```

or with yarn:

```bash
yarn add @ffilip/mui-react-utils
```

## Usage

```ts
import { useDidUpdateEffect } from "@ffilip/mui-react-utils/react";
import { Centered } from "@ffilip/mui-react-utils/components";
import { useIsThemeDark } from "@ffilip/mui-react-utils/mui";
```

## Optional global styles

To include the default styles, import them manually in your app entry:

```ts
import "@ffilip/mui-react-utils/styles.css";
```

## Features

🧩 **Composable utilities** — ready-to-use React hooks and helpers built around MUI and modern React patterns.

🧱 **MUI integration** — utilities designed to extend or simplify Material UI usage (e.g., theme mode detection, layout helpers).

⚙️ **Browser helper** — lightweight React hook for tracking page visibility that works seamlessly across environments.

🧠 **Fully typed with TypeScript** — all exports include built-in type definitions; no `@types` packages required.

## 🎨 Available style modules

| Import path                          | Description              |
| ------------------------------------ | ------------------------ |
| `@ffilip/mui-react-utils/global.css` | All-in-one global styles |

## License

MIT © 2025 Phillip K.
