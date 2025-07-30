```
frontend/
├── app/                              // EXPO ROUTER DIRECTORY - ONLY FOR SCREENS AND NAVIGATION
│   ├── (auth)/                       // Route Group for authentication screens
│   │   ├── sign-in.tsx               // Login screen
│   │   └── sign-up.tsx               // Register screen
│   ├── (main)/                       // Route Group for authenticated/main app screens
│   │   ├── _layout.tsx               // Main app layout (e.g., Tab Navigator)
│   │   ├── index.tsx                 // TodoListScreen.tsx (Home screen of main flow)
│   │   └── profile.tsx               // ProfileScreen.tsx
│   ├── _layout.tsx                   // Root layout for the entire app
│   └── +not-found.tsx                // Custom 404 screen
│
├── api/                              // API calls configuration and functions
│   ├── axiosInstance.ts              // Configures base Axios instance
│   ├── authApi.ts                    // API calls related to authentication
│   ├── todoApi.ts                    // API calls related to Todo items
│   └── index.ts                      // Exports all API functions
│
├── assets/                           // Static assets (images, fonts, icons)
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── components/                       // Modal (pop-up) Components
│   └── common/                       // Reusable, generic components
│       ├── Button.tsx
│       └── Input.tsx
│
├── ui-components/                    // UI components
│   ├── auth/                         // Auth-specific components used across screens
│   │   └── AuthForm.tsx
│   ├── todo/                         // Todo-specific components
│   │   ├── TodoItemCard.tsx
│   │   └── TodoForm.tsx
│   └── Layout.tsx                    // Common layout component
│
├── constants/                        // Global constants
│   ├── api.ts                        // API endpoints, status codes
│   └── colors.ts                     // Color variables for app constants
│
├── contexts/                         // React Context API providers
│   ├── ThemingContext.tsx            // Provides theming state and functions globally
│   └── AuthContext.tsx               // Provides authentication state and functions globally
│
├── hooks/                            // Custom React hooks
│   ├── useAuth.ts                    // Custom hook for authentication context
│   └── useTodos.ts                   // Custom hook for Todo-related TanStack Query logic
│
├── types/                            // TypeScript interfaces and types
│   └── index.ts                      // TypeScript interfaces for API responses, models
│
├── utils/                            // Utility functions and helpers
│   └── helpers.ts                    // General utility functions
│
├── package.json
├── tsconfig.json
├── app.json                          // Expo configuration
├── metro.config.js
└── README.m
```
