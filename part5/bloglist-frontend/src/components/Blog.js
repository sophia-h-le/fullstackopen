import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'View'

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeBlog = () => {
    props.deleteBlog(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blogObject.likes}{' '}
          <button id="like-button" onClick={increaseLikes}>
            Like
          </button>
        </div>
        <button id="remove-button" onClick={removeBlog}>
          Remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
