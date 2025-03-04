import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

let blogPosts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'This is my first blog post'
  },
  {
    id: 2,
    title: 'Second Blog Post',
    content: 'This is my second blog post'
  },
  {
    id: 3,
    title: 'Third Blog Post',
    content: 'This is my third blog post'
  }
]

app.use("*", prettyJSON())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/posts', (c) => c.json({posts: blogPosts}))

app.get('/posts/:id', (c) => {
  const id = c.req.param("id")
  const post = blogPosts.find(p => p.id === Number(id))

  if (post) {
    return c.json(post)
  } else {
    return c.status(404).json({error: 'Post not found'})
  }
})

app.post('/posts',async (c) =>  {
  const {title, content} = await c.req.json<{title: string, content: string}>()
  const newPost= {id: blogPosts.length + 1, title, content}
  blogPosts = [...blogPosts, newPost]
  return c.json(newPost)
})

app.put("/posts/:id", async (c) => {
  const id = c.req.param("id")
  const index = blogPosts.findIndex(p => p.id === Number(id))

  if (index === -1) {
    return c.status(404).json({error: 'Post not found'})
  }

  const {title, content} = await c.req.json<{title: string, content: string}>()
  blogPosts[index] = {...blogPosts[index], title, content}

  return c.json(blogPosts[index])
})

export default app
