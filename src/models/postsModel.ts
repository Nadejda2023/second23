
export type PostViewInputModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  }

export type PostViewModel = {
    [x: string]: string
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string,
  }