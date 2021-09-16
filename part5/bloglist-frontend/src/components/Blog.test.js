import React from 'react'
import'@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component test', () => {
    let blog = {
        title: 'Sample blog',
        author: 'Sample Author',
        url: 'http://sampleblog.com/',
        likes: 6545
    }

    let mockUpdateBlog = jest.fn()
    let mockDeleteBlog = jest.fn()

    test('render title - author', () => {
        const component = render(
            <Blog blog={blog} updateBlog={mockDeleteBlog} deleteBlog={mockDeleteBlog} />
        )
        expect(component.container).toHaveTextContent(
            'Sample blog - Sample Author'
        )
    })

    test('clicking view button will show url and likes', () => {
        const component = render(
            <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
        )
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        expect(component.container).toHaveTextContent(
            'http://sampleblog.com/'
        )
        expect(component.container).toHaveTextContent(
            '6545'
        )
    })
})