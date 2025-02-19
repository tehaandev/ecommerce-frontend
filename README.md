# E-commerce Vendor Portal

A React-based vendor portal for managing e-commerce products with features like product management, favorites, and search functionality.

## Features

- Product Management (CRUD)
- Product Search & Suggestions
- Favorites System
- Authentication
- Redux for global state management

## Setup

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the development server

```sh
npm run dev
```

## Test Login

- Email: test@email.com
- Password: password

## Folder Structure

```
ecommerce-frontend/
│── public/                       # Publicly served files
│── src/                          # Main source code
│   ├── assets/                   # Static assets
│   ├── components/               # React Components
│   │   ├── auth/                 # Login components
│   │   ├── product/              # Product components
│   │   ├── shared/               # Shared components
│   │   ├── ui/                   # UI layouts and configs
│   ├── hooks/                    # Custom hooks
│   ├── interfaces/               # Interfaces and types
│   │   ├── auth.ts               # Interfaces for auth components
│   │   ├── product.ts            # Interfaces for product components
│   │   ├── props.ts              # Interfaces for props
│   ├── lib/                      # Configs and Initaliazations
│   │   ├── api.ts                # Axios initialization
│   ├── pages/                    # Pages
│   ├── services/                 # Services
│   │   ├── authService.ts
│   ├── models/                   # Mogoose models
│   │   ├── Product.ts
│   │   ├── ProductImage.ts
│   │   ├── User.ts
├── ├── slices/                   # Slices
│   │   ├── authSlice.ts
├── ├── stores/                   # Global States
│   │   ├── authStore.ts
│   │   ├── hooks.ts
│   ├── theme/                    # Ant Design Config
│   ├── utils/                    # Utility functions/helpers
│   │   ├── constructImageUrl.ts  # Construct image URL from image name
│   │   ├── getThumnail.ts        # Get thumbnail URL from images array
│   ├── App.tsx                   # App Component (Routing etc.)
│   ├── index.css                 # Main CSS file
│   ├── main.tsx                  # App entry point
│   ├── vite-env.d.ts             # Vite declarations
│── .env                          # Environment variables
│── .gitignore                    # Git ignore file
│── .prettierrc                   # Prettier config file
│── eslint.config.js              # ESLint config
│── env.sample                    # Sample environment variables file
│── index.html                    # Main HTML file
│── package.json                  # Dependencies & scripts
│── README.md                     # Project documentation
│── tsconfig.app.json             # TypeScript configuration
│── tsconfig.json                 # TypeScript configuration
│── tsconfig.node.json            # TypeScript configuration
│── vite.config.ts                # Vite configurations
```
