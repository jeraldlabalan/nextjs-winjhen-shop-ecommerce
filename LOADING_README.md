# Loading Components Documentation

This project now includes a comprehensive loading system with a top progress bar similar to GitHub and Google's loading effect, plus enhanced button loading states.

## 🚀 Features

- **Top Progress Bar**: A horizontal line that slides from left to right at the top of the page
- **Button Loading States**: Built-in loading spinners and text for buttons
- **Navigation Loading**: Automatic loading states when navigating between pages
- **Auth Loading**: Loading states for authentication operations
- **Customizable Colors**: Choose from blue, green, purple, or orange progress bars
- **Global State Management**: Zustand-based state management for loading states

## 📁 Components Structure

```
components/
├── ui/
│   ├── loading-bar.tsx      # Top progress bar component
│   └── button.tsx           # Enhanced button with loading states
└── providers/
    └── loading-provider.tsx # Loading provider wrapper

lib/
├── use-loading.ts           # Global loading state hook
├── use-navigation-loading.ts # Navigation loading hook
└── use-auth-loading.ts      # Authentication loading hook
```

## 🎯 Usage Examples

### 1. Top Progress Bar

The progress bar automatically appears at the top of the page when loading states are active.

```tsx
import { useLoading } from "@/lib/use-loading"

function MyComponent() {
  const { startLoading, stopLoading } = useLoading()
  
  const handleAction = () => {
    startLoading()
    // Do something...
    setTimeout(() => stopLoading(), 2000)
  }
  
  return <button onClick={handleAction}>Start Loading</button>
}
```

### 2. Button Loading States

```tsx
import { Button } from "@/components/ui/button"

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Button 
      loading={isLoading}
      loadingText="Processing..."
      onClick={() => setIsLoading(true)}
    >
      Click Me
    </Button>
  )
}
```

### 3. Navigation Loading

```tsx
import { useNavigationLoading } from "@/lib/use-navigation-loading"

function MyComponent() {
  const { navigateWithLoading } = useNavigationLoading()
  
  return (
    <Button onClick={() => navigateWithLoading("/dashboard")}>
      Go to Dashboard
    </Button>
  )
}
```

### 4. Authentication Loading

```tsx
import { useAuthLoading } from "@/lib/use-auth-loading"

function LoginForm() {
  const { handleAuthWithLoading } = useAuthLoading()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await handleAuthWithLoading(
      async () => {
        // Your auth logic here
        const result = await signIn("credentials", { email, password })
        // Handle success
      },
      () => console.log("Success!"),
      (error) => console.error("Error:", error)
    )
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## 🎨 Customization

### Progress Bar Colors

```tsx
import { LoadingBar } from "@/components/ui/loading-bar"

// Available colors: blue, green, purple, orange
<LoadingBar isLoading={true} color="green" />
```

### Button Variants

```tsx
// Available variants: default, destructive, outline, secondary, ghost, link, auth
<Button variant="auth" loading={true}>
  Sign In
</Button>
```

## 🔧 Implementation Details

### Loading Provider

The `LoadingProvider` wraps your app in `layout.tsx` to enable the top progress bar:

```tsx
// app/layout.tsx
import { LoadingProvider } from "@/components/providers/loading-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

### State Management

The loading system uses Zustand for global state management, ensuring consistent loading states across your entire application.

## 🧪 Testing

Visit `/loading-demo` to test all loading features:

- Top progress bar controls
- Button loading states
- Navigation loading
- Authentication loading
- Different progress bar colors

## 🎯 Best Practices

1. **Use the appropriate hook** for your use case:
   - `useLoading` for general loading states
   - `useNavigationLoading` for page navigation
   - `useAuthLoading` for authentication operations

2. **Always handle errors** in auth operations using the error callback

3. **Use button loading states** for immediate user feedback

4. **Keep loading times reasonable** - users expect quick responses

5. **Combine with button loading** for better UX when appropriate

## 🚀 Quick Start

1. The loading system is already integrated into your app
2. Visit the homepage and click "🚀 Try Loading Demo"
3. Test different loading scenarios
4. Use the hooks in your components as needed

## 📝 Notes

- The progress bar automatically appears at the top of the page
- Loading states are managed globally using Zustand
- All loading components are fully responsive
- The system respects your light theme preference
- No dark mode implementation (as per your requirements)
