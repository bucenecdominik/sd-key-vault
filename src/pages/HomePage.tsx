import Box from '@mui/material/Box'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import PasswordGrid from '../components/PasswordGrid'
import PasswordDetail from '../components/PasswordDetail'
import { mockPasswords, mockFolders } from '@mocks'
import type { Password } from '@types'

export default function HomePage() {
  const [selectedPassword, setSelectedPassword] = useState<Password | null>(null)

  return (
    <Box display="flex" height="100vh" bgcolor="background.default">
      <Sidebar folders={mockFolders} />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <SearchBar />
        <PasswordGrid passwords={mockPasswords} onSelect={setSelectedPassword} />
      </Box>
      <PasswordDetail password={selectedPassword} />
    </Box>
  )
}
