# react-micro-hooks

<div align="center">

**Collection of single-responsibility React hooks for common use cases**

[![npm version](https://img.shields.io/npm/v/@sofransebastian/react-micro-hooks.svg)](https://www.npmjs.com/package/@sofransebastian/react-micro-hooks)
[![npm downloads](https://img.shields.io/npm/dm/@sofransebastian/react-micro-hooks.svg)](https://www.npmjs.com/package/@sofransebastian/react-micro-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

## 📦 Installation

```bash
npm install @sofransebastian/react-micro-hooks
```

```bash
yarn add @sofransebastian/react-micro-hooks
```

```bash
pnpm add @sofransebastian/react-micro-hooks
```

## ✨ Features

-   🎯 **Single-responsibility** - Each hook does one thing well
-   📦 **Lightweight** - Minimal dependencies, tree-shakeable
-   🔒 **Type-safe** - Full TypeScript support
-   ⚡ **Modern** - ESM and CommonJS support
-   🧪 **Well-tested** - Production-ready code

## 🚀 Hooks

### `useDebounce`

<details>
<summary>Show example</summary>

```tsx
import { useState, useEffect } from 'react';
import { useDebounce } from '@sofransebastian/react-micro-hooks';

function SearchBox() {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 300);

    useEffect(() => {
        if (debouncedInput) {
            console.log('Searching for:', debouncedInput);
            // Perform API call here
        }
    }, [debouncedInput]);

    return (
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type to search..."
        />
    );
}
```

</details>

### `useMediaQuery`

<details>
<summary>Show example</summary>

```tsx
import { useMediaQuery } from '@sofransebastian/react-micro-hooks';

function App() {
    const isTablet = useMediaQuery(
        '(min-width: 768px) and (max-width: 1024px)'
    );
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div>
            {isDesktop && <DesktopHeader />}
            {isTablet && <TabletHeader />}
            {!isTablet && !isDesktop && <MobileHeader />}
        </div>
    );
}
```

</details>

## 🛠️ Requirements

-   React 16.8+ (hooks support)
-   TypeScript 4.5+ (for TypeScript projects)

## 📝 License

MIT © [Sofran Sebastian](https://github.com/SofranSebastian)

## 👨‍💻 Author

**Sofran Sebastian**

-   GitHub: [@SofranSebastian](https://github.com/SofranSebastian)
-   NPM: [@sofransebastian](https://www.npmjs.com/~sofransebastian)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/SofranSebastian/react-micro-hooks/issues).

## ⭐ Show Your Support

If you find this library useful, please consider giving it a star on GitHub!

---

**Developed by Sofran Sebastian**
