import Box from '@mui/material/Box'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import PasswordGrid from './components/PasswordGrid'
import PasswordDetail from './components/PasswordDetail'
import { Password } from '@types'

const passwords: Password[] = [
  {
    Id: 1,
    FolderId: 1,
    Name: 'Heslo 1',
    Description: 'Popis 1',
    PasswordId: 1,
    UserName: 'user1',
    CreatedBy: 1,
    CreatedAt: new Date(),
    UpdatedBy: 1,
    UpdatedAt: new Date(),
  },
  {
    Id: 2,
    FolderId: 1,
    Name: 'Heslo 2',
    Description: 'Popis 2',
    PasswordId: 2,
    UserName: 'user2',
    CreatedBy: 1,
    CreatedAt: new Date(),
    UpdatedBy: 1,
    UpdatedAt: new Date(),
  },
]

export default function App() {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <SearchBar />
        <PasswordGrid passwords={passwords} />
      </Box>
      <PasswordDetail />
    </Box>
  )
}
