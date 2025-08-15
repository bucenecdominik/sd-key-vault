import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PublicIcon from '@mui/icons-material/Public'
import DnsIcon from '@mui/icons-material/Dns'
import RedditIcon from '@mui/icons-material/Reddit'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import type { ReactElement } from 'react'
import { useVaultStore } from '../../../app/store/vault'
import { selectFilteredItems } from '../selectors'
import { formatRelative } from '../model/time'

const iconMap: Record<string, ReactElement> = {
  globe: <PublicIcon />,
  server: <DnsIcon />,
  reddit: <RedditIcon />,
  bank: <AccountBalanceIcon />,
}

export default function ItemList() {
  const items = useVaultStore(selectFilteredItems)
  const selectItem = useVaultStore((s) => s.selectItem)

  return (
    <List sx={{ flex: 1, overflowY: 'auto' }}>
      {items.map((item) => (
        <ListItemButton key={item.id} onClick={() => selectItem(item.id)}>
          <ListItemIcon>{iconMap[item.icon ?? 'globe']}</ListItemIcon>
          <ListItemText
            primary={item.name}
            secondary={formatRelative(item.updatedAt)}
          />
        </ListItemButton>
      ))}
    </List>
  )
}

