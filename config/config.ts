export default function config(key: string): string {
  return import.meta.env[key] as string
}
