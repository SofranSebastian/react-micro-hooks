# react-micro-hooks

<div align="center">

**Collection of single-responsibility React hooks for common use cases**

[![npm version](https://img.shields.io/npm/v/@sofransebastian/react-micro-hooks.svg)](https://www.npmjs.com/package/@sofransebastian/react-micro-hooks)
[![npm downloads](https://img.shields.io/npm/dm/@sofransebastian/react-micro-hooks.svg)](https://www.npmjs.com/package/@sofransebastian/react-micro-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

> **⚠️ Disclaimer:** This library is experimental and designed for development environments only. If you plan to use it in a production environment, please thoroughly test it first to ensure it meets your requirements and works correctly in your specific use case.

## 📦 Installation

```bash
npm install @sofransebastian/react-micro-hooks
```

```bash
yarn add @sofransebastian/react-micro-hooks
```

## ✨ Features

-   🎯 **Single-responsibility** - Each hook does one thing well
-   📦 **Lightweight** - Minimal dependencies, tree-shakeable
-   🔒 **Type-safe** - Full TypeScript support
-   ⚡ **Modern** - ESM and CommonJS support

## 🚀 Hooks

#### `useWorkflow`

<details>
<summary>Show example</summary>

```tsx
const { copied, copy } = useClipboard();
<button onClick={() => copy('text')}>{copied ? '✅' : '📋'}</button>;
```

</details>

#### `useWorkflow`

<details>
<summary>Show example</summary>

```tsx
const steps = [
    {
        id: 'account',
        onNext: () => form.isValid(),
    },
    {
        id: 'profile',
        onNext: async () => {
            await saveProfile();
            return true;
        },
    },
    {
        id: 'confirm',
    },
];

const workflow = useWorkflow(steps, {
    onFinish: () => console.log('Done'),
});

switch (workflow.stepId) {
    case 'account':
        return <AccountStep onNext={workflow.next} />;

    case 'profile':
        return (
            <ProfileStep
                onNext={workflow.next}
                onBack={workflow.back}
            />
        );

    case 'confirm':
        return <ConfirmStep onSubmit={workflow.next} />;
}
```

</details>

#### `useDebounce`

<details>
<summary>Show example</summary>

```tsx
const [input, setInput] = useState('');
const debouncedInput = useDebounce(input, 300);

useEffect(() => {
    if (debouncedInput) {
        // Perform API call here
    }
}, [debouncedInput]);
```

</details>

#### `useMediaQuery`

<details>
<summary>Show example</summary>

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

return (
    <div>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
        {isDarkMode && <DarkModeIndicator />}
    </div>
);
```

</details>

#### `usePrevious`

<details>
<summary>Show example</summary>

```tsx
const [count, setCount] = useState(0);
const previousCount = usePrevious(count);

return (
    <div>
        <p>Current: {count}</p>
        <p>Previous: {previousCount}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
);
```

</details>

#### `useOnlineStatus`

<details>
<summary>Show example</summary>

```tsx
const isOnline = useOnlineStatus();

return <div>{isOnline ? <span>🟢 Online</span> : <span>🔴 Offline</span>}</div>;
```

</details>

#### `useGeolocation`

<details>
<summary>Show example</summary>

```tsx
const { position, error, isLoading } = useGeolocation();

if (isLoading) return <div>Loading location...</div>;
if (error) return <div>Error: {error}</div>;

return (
    <div>
        <p>Lat: {position.latitude}</p>
        <p>Lng: {position.longitude}</p>
    </div>
);
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
