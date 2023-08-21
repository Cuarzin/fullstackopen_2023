const { dummy, totalLikes, emptyBlog } = require('../utils/list_helper')
const blogEntriesForTesting = require('../utils/blog_entries_tests')
const blogPrueba = []

test('dummy must return 1 ', () => {
  expect(dummy(blogEntriesForTesting)).toBe(1)
})

describe('total likes', () => {
  test('of empty list of zero', () => {
    expect(emptyBlog(blogPrueba)).toBe(0)
  })
  
  test('max count of likes ', () => {
    expect(totalLikes(blogEntriesForTesting)).toBe(36)
  })
})