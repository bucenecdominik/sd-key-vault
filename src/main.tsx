import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VaultPage from './pages/VaultPage'
import ProfilePage from './pages/ProfilePage'
import FoldersPage from './pages/FoldersPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminFoldersPage from './pages/admin/AdminFoldersPage'
import { theme } from './theme'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <VaultPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/folders',
    element: <FoldersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/users',
    element: <AdminUsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/folders',
    element: <AdminFoldersPage />,
    errorElement: <ErrorPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
