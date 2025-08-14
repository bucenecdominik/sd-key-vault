import Box from '@mui/material/Box'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import PasswordGrid from '../components/PasswordGrid'
import PasswordDetail from '../components/PasswordDetail'
import { mockPasswords } from '@mocks'

export default function HomePage() {
  return (
    <Box display="flex" height="100vh" bgcolor="background.default">
      <Sidebar />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <SearchBar />
        <PasswordGrid passwords={mockPasswords} />
      </Box>
      <PasswordDetail />
    </Box>
  )
}
