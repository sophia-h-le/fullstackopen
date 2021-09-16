import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import{ render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm component updates parent state and calls onSubmit', () => {
    let mockCreateBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={mockCreateBlog}/>
    )

    const titleInput = component.container.querySelector('#title')
    const form = component.container,querySelector('form')

    fireEvent.change(titleInput, {
        target: { value: 'Sample blog create'}
    })
    fireEvent.submit(form)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('Sample blog create')
})