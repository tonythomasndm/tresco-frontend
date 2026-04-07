# 🚀 Trustcore - Development Guidelines

This repository follows strict development standards to ensure scalability, readability, and maintainability.

---

# 🧭 Branching Strategy

- `main` → Primary development branch (stable at all times)
- All work must start from `main`

### 🔹 Branch Naming

| Type      | Format                         | Example                        |
|----------|--------------------------------|--------------------------------|
| Feature  | feature/short-description       | feature/login-page             |
| Fix      | fix/short-description           | fix/api-error                  |
| Refactor | refactor/short-description      | refactor/component-cleanup     |
| Chore    | chore/short-description         | chore/update-deps              |

---

### 🔹 Workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature
```

After changes:

```bash
git add .
git commit -m "feat: add login feature"
git push origin feature/your-feature
```

👉 Create Pull Request → Review → Merge to `main`

---

# 📝 Conventional Commits (MANDATORY)

## 🔹 Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

---

## 🔹 Types

feat, fix, docs, style, refactor, perf, test, chore, build, ci

---

## 🔹 Examples

```
feat: add authentication
fix(api): resolve login error
feat!: remove legacy API

BREAKING CHANGE: API response updated
```

---

## 🔹 Rules

- MUST use type prefix
- Short and meaningful description
- Use scope when needed
- Use `!` or BREAKING CHANGE for breaking changes

---

# 💻 React Coding Standards

## 🔹 Naming Conventions

| Element     | Convention       |
|------------|-----------------|
| Constants  | UPPER_CASE      |
| Variables  | camelCase       |
| Functions  | camelCase       |
| Components | PascalCase      |
| Hooks      | useSomething    |

---

# 🧱 Frontend Architecture (IMPORTANT)

```
src/
├── components/
│   ├── common/        # reusable UI (Button, Input)
│   ├── layout/        # Navbar, Sidebar
│   └── features/      # feature-specific
├── pages/             # route-level components
├── hooks/             # custom hooks
├── services/          # API calls
├── utils/             # helper functions
├── constants/         # static values
├── context/           # global state (if needed)
├── assets/            # images/icons
└── styles/
```

---

# ⚛️ React Component Strategy

## ✅ Best Practices

- One component = one responsibility
- Keep components **small & modular**
- Use **functional components only**
- Extract reusable logic into **custom hooks**
- Separate **UI and business logic**

---

## 🔹 Smart vs Dumb Components

| Type        | Purpose |
|------------|--------|
| Presentational | UI only |
| Container      | Logic + data |

---

## 🔹 Example

```jsx
// ❌ Bad
const Component = () => {
  const data = fetchData();
  return <div>{data}</div>;
};

// ✅ Good
const useData = () => { ... };

const Component = () => {
  const data = useData();
  return <UI data={data} />;
};
```

---

# 🎯 State Management Strategy

- Use `useState` → local state
- Use `useReducer` → complex state
- Use `Context API` → global state (small apps)
- Use external libs (Redux/Zustand) → large apps

---

# ⚡ Performance Best Practices

## 🔹 Avoid Re-renders

- Use `React.memo`
- Use `useCallback` for functions
- Use `useMemo` for heavy computations

---

## 🔹 Code Splitting

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));
```

---

## 🔹 Lazy Loading

- Load components only when needed
- Improve initial load time

---

# 🌐 API Handling

- Keep API calls inside `/services`
- Never call APIs directly inside components

```js
// services/userService.js
export const getUser = () => axios.get('/user');
```

---

# 📱 Responsive Design

- Mobile-first approach
- Use Flexbox / Grid
- Avoid fixed widths
- Test on multiple screens

---

# 🎨 UI/UX Best Practices

- Consistent spacing & layout
- Accessible components (ARIA)
- Proper loading states
- Error handling UI

---

# ⚠️ Common Mistakes

❌ Large components  
❌ Business logic inside JSX  
❌ Inline styles everywhere  
❌ No error handling  
❌ No loading states  
❌ Repeating code  
❌ Ignoring performance  

---

# 🧪 Testing Practices

- Write unit tests for components
- Test user interactions
- Use Jest / React Testing Library

---

# 🧹 Code Quality

- Use ESLint + Prettier
- Follow consistent formatting
- Remove unused code
- Avoid console logs in production

---

# ⚙️ Running the App

```bash
npm install
npm run dev
```

---

# 🔍 PR Checklist

- Code follows standards
- Responsive UI
- No errors
- Proper commit format
- Clean architecture

---

# 🔥 Key Rules

👉 Never push directly to `main`  
👉 Always use Conventional Commits  
👉 Keep components small & reusable  
👉 Think scalability from Day 1  

---

# 🧠 Trustcore Engineering Philosophy

- Clean code > complex code  
- Reusability > duplication  
- Performance > quick hacks  
- Consistency > personal style  

---

💡 **Trustcore is built for scale. Write code like it will serve millions.**