import { selectFilteredItems } from './selectors'
import type { VaultItem } from '../../types/vault'
import type { VaultState } from '../../app/store/vault'

const items: VaultItem[] = [
  {
    id: '1',
    name: 'Work Email',
    username: 'alice',
    password: 'p1',
    folder: 'Work',
    updatedAt: '2024-01-01T00:00:00Z',
    notes: '',
    url: 'https://mail.example.com',
  },
  {
    id: '2',
    name: 'Personal Bank',
    username: 'bob',
    password: 'p2',
    folder: 'Personal',
    updatedAt: '2024-01-01T00:00:00Z',
    notes: '',
    url: 'https://bank.example.com',
  },
]

const makeState = (text: string, folder?: string): VaultState => ({
  items,
  filters: { text, folder },
  selectedId: undefined,
  init: () => {},
  setFilterText: () => {},
  setFolder: () => {},
  selectItem: () => {},
  updateItemPartial: () => {},
  clearFilters: () => {},
})

describe('selectFilteredItems', () => {
  it('filters by text and folder', () => {
    const state = makeState('bank', 'Personal')
    expect(selectFilteredItems(state)).toEqual([items[1]])

    const state2 = makeState('bank', 'Work')
    expect(selectFilteredItems(state2)).toEqual([])
  })
})
