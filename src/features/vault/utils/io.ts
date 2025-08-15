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
  const mapped: VaultItem[] = data.map((x: any) => ({
    id: String(x.id),
    name: String(x.name),
    username: x.username ? String(x.username) : undefined,
    password: x.password ? String(x.password) : undefined,
    url: x.url ? String(x.url) : undefined,
    folder: x.folder,
    updatedAt: x.updatedAt ? String(x.updatedAt) : new Date().toISOString(),
    notes: x.notes ? String(x.notes) : undefined,
    icon: x.icon,
  }));
  return mapped;
}

export function mergeById(base: VaultItem[], incoming: VaultItem[]): VaultItem[] {
  const map = new Map<string, VaultItem>(base.map((i) => [i.id, i]));
  for (const it of incoming) {
    map.set(it.id, { ...(map.get(it.id) || {} as VaultItem), ...it });
  }
  return Array.from(map.values());
}