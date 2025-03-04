import { Hono } from "hono"

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

app.get('/', (c) => c.json({posts: blogPosts}))

app.get('//:id', (c) => {
  const id = c.req.param("id")
  const post = blogPosts.find(p => p.id === Number(id))

  if (post) {
    return c.json(post)
  } else {
    c.status(404)
    return c.json({error: 'Post not found'})
  }
})

app.post('/',async (c) =>  {
  const {title, content} = await c.req.json<{title: string, content: string}>()
  const newPost= {id: blogPosts.length + 1, title, content}
  blogPosts = [...blogPosts, newPost]
  return c.json(newPost)
})

app.put("/:id", async (c) => {
  const id = c.req.param("id")
  const index = blogPosts.findIndex(p => p.id === Number(id))

  if (index === -1) {
    return c.json({error: 'Post not found'})
  }

  const {title, content} = await c.req.json<{title: string, content: string}>()
  blogPosts[index] = {...blogPosts[index], title, content}

  return c.json(blogPosts[index])
})

app.delete("/:id", async (c) => {
  const id = c.req.param("id")
  const index = blogPosts.findIndex(p => p.id === Number(id))

  if (index === -1) {
    return c.json({error: 'Post not found'})
  }

  blogPosts = blogPosts.filter(p => p.id !== Number(id))

  return c.json({message: 'Post deleted'})
})

export default app