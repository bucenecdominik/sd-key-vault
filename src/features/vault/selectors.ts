import type { VaultItem } from '../../types/vault';
import type { VaultFilters } from '../../app/store/vault';

const norm = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const matchesText = (it: VaultItem, text: string) => {
  if (!text) return true;
  const q = norm(text);
  return (
    norm(it.name).includes(q) ||
    norm(it.username ?? '').includes(q) ||
    norm(it.url ?? '').includes(q) ||
    norm(it.notes ?? '').includes(q)
  );
};

export const filterItems = (items: VaultItem[], filters: VaultFilters) => {
  return items.filter((it) => {
    if (!matchesText(it, filters.text)) return false;
    if (filters.folder && it.folder !== filters.folder) return false;
    return true;
  });
};