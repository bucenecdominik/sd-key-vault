import { useEffect, useRef } from 'react';
import { useVaultStore } from '../store/vault';
import type { VaultFolder } from 'src/types/vault';

/**
 * Udržuje URL query v syncu se stavem aplikace (q, folder, id).
 * - Při mountu načte hodnoty z URL a aplikuje do store.
 * - Při změně ve store zapíše do URL pomocí history.replaceState.
 */
export function useUrlState() {
  const filters = useVaultStore((s) => s.filters);
  const selectedId = useVaultStore((s) => s.selectedId);
  const setFilterText = useVaultStore((s) => s.setFilterText);
  const setFolder = useVaultStore((s) => s.setFolder);
  const selectItem = useVaultStore((s) => s.selectItem);

  const inited = useRef(false);

  // 1) Načtení z URL při mountu
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    const folder = params.get('folder') || undefined;
    const id = params.get('id') || undefined;

    if (q) setFilterText(q);
    if (folder) setFolder(folder as VaultFolder);
    if (id) selectItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Zápis do URL při změně store
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (filters.text) params.set('q', filters.text); else params.delete('q');
    if (filters.folder) params.set('folder', String(filters.folder)); else params.delete('folder');
    if (selectedId) params.set('id', selectedId); else params.delete('id');

    const query = params.toString();
    const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    // Použij replaceState (nepřidává položky do historie)
    window.history.replaceState(null, '', next);
  }, [filters.text, filters.folder, selectedId]);
}