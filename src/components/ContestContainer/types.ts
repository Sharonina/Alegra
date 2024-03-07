export interface User {
  id: number
  name: string
}

export interface UserWithPoints extends User {
  points: number
  image: string
}

export interface Image {
  image: {
    thumbnailLink: string
  }
}
