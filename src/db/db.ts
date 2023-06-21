

export type DB = {
  blogs: any,
  posts: any
}
export const db: DB = {
  blogs: [
  {
    id: "01",
    name: "yurii",
    description: "string",
    websiteUrl: "string"
  },
  {
    id: "02",
    name: "string",
    description: "string",
    websiteUrl: "string"
    }
  ],
  posts: [    
  {
    id: "01",
    title: "First",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "02",
    title: "First",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};

