import { CharacterResponse } from '@/entities/api-response'

export function chunkArray(array: CharacterResponse[], size: number) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}
