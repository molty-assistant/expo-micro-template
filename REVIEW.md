# Self-Review: expo-micro-template

## Code Review ✅

### What's Good
- **TypeScript strict mode** — catches nullability and type errors at compile time
- **Clean type-check** — `tsc --noEmit` passes with zero errors
- **Path aliases** — `@/` avoids deep relative imports (`../../../`)
- **Separation of concerns** — tokens, components, hooks, utils, screens all in predictable locations
- **Component API design** — Button has sensible defaults (haptic=true, variant="primary"), composable via style props
- **useStorage** — clean abstraction over AsyncStorage that mirrors useState API. Loading state included.

### Issues Found
1. **useStorage race condition** — If `setValue` is called before the initial `AsyncStorage.getItem` resolves, the loaded value will overwrite the set value. Should guard with a `loaded` ref.
2. **No error boundaries** — If a screen throws, the whole app crashes. Should add an ErrorBoundary in `_layout.tsx`.
3. **No lint/format config** — Missing ESLint + Prettier. Should add for consistency across apps.
4. **Missing `.nvmrc` / `engines`** — No Node version pinning.
5. **Card component** — `ViewProps` spread is fine but `children` typing could be explicit for better DX.

### Severity
- #1: Medium (data loss potential) — fix before shipping any app
- #2: Medium (crash resilience) — add before first release
- #3-5: Low — nice to have, can iterate

## UX/UI Review ✅

### What's Good
- **Design tokens** — Centralised, consistent. Any app built from this will look cohesive.
- **iOS-native feel** — Typography scale follows Apple HIG (17pt body, 28pt h1). Touch targets ≥44pt.
- **Haptic feedback** — Wired into Button by default. Small detail, big polish.
- **Safe area handling** — SafeAreaProvider in root layout. No content hidden under notch/status bar.
- **Light/dark support** — `userInterfaceStyle: "automatic"` in app.json. But...

### Issues Found
1. **No dark mode tokens** — `theme.ts` only has light values. Need a `darkColors` set or `useColorScheme()` hook to switch.
2. **No loading/skeleton state** — Template should show a pattern for loading states (common in every app).
3. **No empty state pattern** — Most apps need "nothing here yet" screens. Worth including a template.
4. **Splash screen** — Using default Expo splash. Each app needs custom, but template should document the process.
5. **No navigation pattern for tabs** — Many micro-apps need a tab bar. Should include a tab layout example (even if commented out).

### Severity
- #1: High — dark mode is expected on both platforms. Users will see broken colors.
- #2-3: Medium — common patterns, should be in template
- #4-5: Low — per-app customisation

## Action Items (Priority Order)

1. **Fix useStorage race condition** — guard initial load
2. **Add dark mode support** — `useColorScheme` + dark token set
3. **Add ESLint + Prettier** — standard config
4. **Add ErrorBoundary component**
5. **Add tab layout example** (commented out in _layout.tsx)

---

*Reviewed by Molty 🦉 — 2026-02-07*
