# 📌 Task Management App

**Frontend side of a full-stack Task Management App built using Next.js (App Router), Apollo Client, GraphQL, Express.js, and PostgreSQL**.

## 🚀 Live Demo

🔹 **Frontend**: [Live on Vercel](https://your-frontend.vercel.app)  
🔹 **Backend**: [GraphQL API](https://your-backend.railway.app/graphql)

---

## 📂 Folder Structure

```plaintext
task-management-frontend/
├── frontend/                      # Next.js Frontend Apollo client GraphQL API
│   ├── app/
│   │   ├── layout.tsx              # App Layout
│   │   ├── page.tsx                # Home Page
│   │   ├── dashboard/page.tsx       # Task Dashboard
│   │   ├── task-management/page.tsx # Create/Edit Task Page
│   ├── components/                 # Reusable Components
│   │   ├── Footer.tsx
│   │   ├── Herosection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   ├── context/                    # React Context for Auth
│   │   ├── AuthContext.tsx
│   ├── graphql/                     # Apollo GraphQL Queries
│   │   ├── queries.ts
│   │   ├── provider.tsx
│   │   ├── mutations.ts
│   ├── styles/                      # Global Styles
│   ├── tests/                       # Frontend Tests
│   ├── .env                         # Environment Variables
│   ├── package.json                 # Dependencies
│   ├── README.md                     # Frontend Documentation
│
├── .gitignore
├── README.md                        # Main Documentation
└── LICENSE
```

# 🛠️ Installation & Setup

## 1️⃣ Clone the Repository

🔹git clone https://github.com/YOUR_GITHUB_USERNAME/task-management-app.git

## cd task-management-frontend

## 2️⃣ Install Dependencies

🔹npm install

## 3️⃣ Set Up Environment Variables

🔹NEXT_PUBLIC_API_URL=https://your-backend.railway.app/graphql

## 4️⃣ Start the Application

🔹npm run dev
