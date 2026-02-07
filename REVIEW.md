# Review: expo-micro-template

*Opus 4.6 review — 2026-02-07*

---

## Code Review

### ✅ Strengths
- **TypeScript strict, clean compile.** Good baseline for all future apps.
- **Path aliases (`@/`)** eliminate fragile relative imports — this alone saves headaches.
- **Design tokens are comprehensive.** Colors, spacing, border radius, typography, shadows — all centralised. The `ColorTokens` interface means apps get autocomplete and type-checking on theme customisation.
- **`useThemeColors()` hook** is the right pattern — components use dynamic colours, StyleSheet.create uses static defaults.
- **Button component** is well-designed: variants, sizes, haptics, loading, disabled states all handled. The API is clean.
- **`useStorage` race condition fix** (hasSetBeforeLoad ref) is correct and non-obvious — good catch from self-review.

### 🟡 Medium Issues

**1. Template Button uses static `colors` import, not `useThemeColors()`**
The Button component imports `colors` (which defaults to `lightColors`) and uses it in `StyleSheet.create` and in the variant maps. This means Button colours DON'T respond to dark mode. The `ActivityIndicator` colour and all variant styles are frozen to light theme values.

*Fix:* Button needs to use `useThemeColors()` inside the component and apply colours via inline styles (same pattern as the screen components), or accept a `colors` prop.

**2. Card has the same dark mode problem**
Uses `colors.card`, `colors.separator` from the static import.

*Fix:* Same as Button — use `useThemeColors()`.

**3. No `.nvmrc` or `engines` field**
Template doesn't pin Node version. Different Node versions could cause subtle build differences across machines.

*Fix:* Add `.nvmrc` with `20` (or whatever LTS) and `engines` in `package.json`.

**4. No ESLint or Prettier config**
For a template that'll be cloned repeatedly, inconsistent formatting will creep in fast.

*Fix:* Add minimal ESLint (expo config) + Prettier with a `.prettierrc`.

### 🟢 Minor Issues

**5. `src/types/index.ts` and `src/utils/index.ts` are near-empty.** Fine as scaffolding but the types file just exports `type ID = string` which is misleading — a template user might think they need to use it.

**6. Settings screen** is a basic placeholder — fine for a template but could include a more realistic example (e.g., a toggle, a link to "About").

---

## Feature / UX Review

### ✅ Strengths
- **File-based routing with typed routes** — the right default for Expo in 2026.
- **SafeAreaProvider at root** — handles notch/dynamic island correctly.
- **Haptics included by default** — this is a differentiator. Most templates skip this.
- **Persistent state hook included** — most first apps need local storage immediately.
- **`userInterfaceStyle: "automatic"`** — correct default for cross-platform.
- **Design principles in README** are good. "One thing, done well" sets the tone.

### 🟡 Gaps as a Template

**1. No tab layout example**
Many micro-apps need tabs. The template should include a commented-out tab layout in `_layout.tsx` or a separate `app/(tabs)/` example.

**2. No ErrorBoundary**
If a screen throws, the whole app crashes. A template should include a basic ErrorBoundary so derived apps are crash-resilient from day one.

**3. No loading/skeleton pattern**
Every app has loading states. A `Skeleton` or `LoadingPlaceholder` component would be a useful inclusion.

**4. No EAS configuration**
The README mentions EAS Build but there's no `eas.json`. Including a starter config would remove a speed bump.

### 🟢 Nice-to-Have

**5. Example of a modal route** (Expo Router supports `app/modal.tsx` with `presentation: "modal"` in the Stack).

**6. Pre-configured app icons** — even placeholder ones at the right dimensions so devs don't have to Google iOS icon sizes.

---

## Summary

| Area | Rating | Notes |
|------|--------|-------|
| Code quality | ⭐⭐⭐⭐ | Clean TypeScript, good structure |
| Dark mode | ⭐⭐⭐ | Tokens exist but Button/Card don't use them dynamically |
| Template completeness | ⭐⭐⭐ | Covers basics well. Missing tabs, ErrorBoundary, EAS config |
| Documentation | ⭐⭐⭐⭐ | README is clear with good structure diagram |
| Reusability | ⭐⭐⭐⭐ | Easy to clone and customise. Path aliases + tokens make it fast |

### Priority Fixes
1. Fix Button and Card to use `useThemeColors()` for dark mode
2. Add ESLint + Prettier config
3. Add ErrorBoundary component
4. Add `eas.json` starter config
