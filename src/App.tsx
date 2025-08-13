import Box from '@mui/material/Box'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import PasswordGrid from './components/PasswordGrid'
import PasswordDetail from './components/PasswordDetail'

export default function App() {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <SearchBar />
        <PasswordGrid />
      </Box>
      <PasswordDetail />
    </Box>
  )
}
