import type { VaultItem } from '../../../types/vault';

export function exportItems(items: VaultItem[]) {
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vault-export.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function importItems(file: File): Promise<VaultItem[]> {
  const text = await file.text();
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('Soubor nemá správný formát: pole položek.');
  // Velmi jednoduchá validace tvaru
  const mapped: VaultItem[] = data.map((x: unknown) => {
    const item = x as Partial<VaultItem>;
    return {
      id: String(item.id),
      name: String(item.name),
      username: item.username ? String(item.username) : undefined,
      password: item.password ? String(item.password) : undefined,
      url: item.url ? String(item.url) : undefined,
      folder: item.folder,
      updatedAt: item.updatedAt ? String(item.updatedAt) : new Date().toISOString(),
      notes: item.notes ? String(item.notes) : undefined,
      icon: item.icon,
    };
  });
  return mapped;
}

export function mergeById(base: VaultItem[], incoming: VaultItem[]): VaultItem[] {
  const map = new Map<string, VaultItem>(base.map((i) => [i.id, i]));
  for (const it of incoming) {
    map.set(it.id, { ...(map.get(it.id) || {} as VaultItem), ...it });
  }
  return Array.from(map.values());
}