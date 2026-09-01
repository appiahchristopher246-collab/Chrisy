# Button component

This repository adds a minimal, accessible, and themeable Button component implemented in React + TypeScript using CSS Modules.

Usage example

```tsx
import React from 'react';
import { Button } from 'chrisy-ui/src/components/Button';

export default function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('clicked')}>Click me</Button>
      <Button as="a" href="https://example.com" variant="secondary">Link</Button>
    </div>
  );
}
```

Files added:
- src/components/Button/Button.tsx
- src/components/Button/Button.module.css
- src/components/Button/index.ts
- src/components/Button/__tests__/Button.test.tsx
- package.json, tsconfig.json, jest.config.ts, setupTests.ts
- docs/USAGE.md

Design notes
- Button supports `as="button" | "a"` to render a semantic element.
- Accessible states: disabled, aria-disabled, aria-busy when loading.
- CSS Modules for local styles and simple theme tokens via CSS variables.

Testing
- Jest + ts-jest + React Testing Library tests included.

