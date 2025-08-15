export function formatRelativeTime(date: string | number | Date): string {
  const target = new Date(date)
  const diff = Date.now() - target.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) {
    return `před ${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `před ${hours} h`
  }
  const days = Math.floor(hours / 24)
  return `před ${days} d`
}
