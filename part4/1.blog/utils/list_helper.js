// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = ({ blogEntries }) => {  
  let likesCount = 0  
  blogEntries.map(entry => {
    likesCount += entry.likes
  })
  return likesCount
}

const emptyBlog = (blogs) => {
  return blogs.length === 0 || blogs.isNaN ? 0 : 0
}

module.exports = {
  dummy,
  totalLikes,
  emptyBlog
}