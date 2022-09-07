export const getEnv = (key: string): string | undefined => {
  return process.env[key]
}
