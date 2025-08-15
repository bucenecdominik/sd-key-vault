import type { VaultState } from '../../app/store/vault'
import type { VaultItem } from 'src/types/vault'

const fuzzyMatch = (target: string, query: string): boolean => {
  const t = target.toLowerCase()
  const q = query.toLowerCase()
  let ti = 0
  let qi = 0
  while (ti < t.length && qi < q.length) {
    if (t[ti] === q[qi]) {
      qi++
    }
    ti++
  }
  return qi === q.length
}

export const selectFilteredItems = (state: VaultState): VaultItem[] => {
  const {
    items,
    filters: { text, folder },
  } = state

  const query = text.trim()

  return items.filter((item) => {
    const textMatch = query
      ? [item.name, item.username, item.url ?? ''].some((field) =>
          fuzzyMatch(field, query),
        )
      : true
    const folderMatch = folder ? item.folder === folder : true
    return textMatch && folderMatch
  })
}

