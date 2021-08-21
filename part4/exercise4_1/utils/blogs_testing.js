const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (mostLikes, blog) => {
        return mostLikes.likes < blog.likes
            ? blog
            : mostLikes
    }
    const firstBlog = blogs[0]

    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, firstBlog)
}

const mostBlogAuthor = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        //authorBlogCounts is an array
        const authorBlogCounts = ((authorBlogCount, blog) => {
            authorBlogCount[blog.author] = (authorBlogCount[blog.author] || 0) + 1
            return authorBlogCount
        }, {})

        const authorBlogMaxCount = Math.max(...Object.values(authorBlogCounts))
        const mostCountAuthors = Object.keys(authorBlogCounts).filter(author => authorBlogCounts[author] === authorBlogMaxCount)

        return {
            author: mostCountAuthors[0],
            blogCount: authorBlogMaxCount
        }
    }
}

const mostLikeAuthor = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        const authorLikeCounts = ((authorLikeCount, blog) => {
            authorLikeCount[blog.author] = (authorLikeCount[blog.author] || 0) + blog.likes
            return authorLikeCount
        }, {})

        const authorLikeMaxCount = Math.max(...Object.values(authorLikeCounts))
        const mostLikeAuthors = Object.keys(authorLikeCounts).filter(author => authorLikeCounts[author] === authorLikeMaxCount)

        return {
            author: mostCountAuthors[0],
            likeCount: authorLikeMaxCount
        }
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogAuthor,
    mostLikeAuthor
}