const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const allLikes = blogs.reduce((acc, cur) => acc + cur.likes, 0)
  return allLikes
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || (!blogs.length)) {
    return 
  }

  return blogs.reduce((acc, item) => acc && acc.likes > item.likes ? acc : {
        title: item.title, 
        author: item.author, 
        likes: item.likes 
    }, null)
}

const mostBlogs = (blogs) => {
  const map = new Map()
  for ( const blog of blogs) {
      map.set(blog.author, map.get(blog.author) + 1 || 1)
      if (!res || res.blogs < map.get(blog.author)) {
        const res = {author: blog.author, blogs: map.get(blog.author)}
      }
  }

   return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
} 
