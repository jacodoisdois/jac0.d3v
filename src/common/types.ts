export interface getPostsResponse {
  data: Post[]
  pageInfo: PageInfo
}

export interface Post {
  title: string
  content: string
  visible: boolean
  id: string
  createdAt: string
  updatedAt: string
  tags: Tag[]
}

export interface Tag {
  name: string
  id: string
  createdAt: string
  updatedAt: string
}

export interface PageInfo {
  pageSize: number
  totalPages: number
}

export interface getPostResponse {
  data: Post
  pageInfo: PageInfo
}
