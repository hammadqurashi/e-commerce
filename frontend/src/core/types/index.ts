export * from './http'
export * from './auth'

export interface ImageObject {
  _id: string
  url: string
}

export interface AudioObject {
  _id: string
  url: string
}

export type TDeleteFunc = (id: string) => void
