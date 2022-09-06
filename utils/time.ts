export const localTime = () => {
  const now = new Date()
  const date = now.toLocaleDateString().replace(/\//g, '-')
  const time = now.toLocaleTimeString().replace(/\:/g, '-')
  return `${date}-${time}`
}
