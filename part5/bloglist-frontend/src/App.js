import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) //all blogs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const getAllBlogs = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  //so that user doesn't have to log in again
  const fetchBlogsHook = () => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }
  useEffect(fetchBlogsHook, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async (blogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogToAdd)
      setSuccessMessage(
        `Blog titled ${blogToAdd.title} was successfully added`
      )
      setBlogs(blogs.concat(createdBlog))

      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(`Cannot add blog titled ${blogToAdd.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      setSuccessMessage(
        `Blog titled ${blogToUpdate.title} was successfully updated`
      )
      setBlogs(
        blogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : updatedBlog))
      )

      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(`Cannot update blog titled ${blogToUpdate.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (blogToRemove) => {
    try {
      if (window.confirm(`Delete ${blogToRemove.title} ?`)) {
        blogService.remove(blogToRemove.id)
        setSuccessMessage(
          `Blog titled ${blogToRemove.title} was successfully removed`
        )
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))

        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }
    } catch (exception) {
      setErrorMessage(`Cannot delete blog titled ${blogToRemove.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const byLikesAsc = (blog1, blog2) => blog2.likes - blog1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <div>
            {user.name} logged in{' '}
            <button onClick={handleLogout} type="submit">
              Logout
            </button>
          </div>
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.sort(byLikesAsc).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
