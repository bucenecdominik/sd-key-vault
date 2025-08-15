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

const router = createBrowserRouter([
  {
    path: '/',
    element: <VaultPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/folders',
    element: <FoldersPage />,
  },
  {
    path: '/admin/users',
    element: <AdminUsersPage />,
  },
  {
    path: '/admin/folders',
    element: <AdminFoldersPage />,
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
