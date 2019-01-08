import React, { Component } from 'react'
import Bookmark from './Bookmark'
import api from '../api/init'

class BookmarkList extends Component {
    constructor(props) {
        super(props)
        this.state = { bookmarks: [] }
    }

    // Calls get for bookmarks on server 
    // Sets bookmarks in state
    async fetchBookmarks() {
        try {
            const bookmarks = await api.get('/bookmarks')
            this.setState({ bookmarks: bookmarks.data })
        }
        catch (error) {
            alert(`Can't get bookmarks! Error: ${error}`)
        }
    }

    componentDidMount() {
        this.fetchBookmarks()
    }

    render() {
        const { bookmarks } = this.state
        return (
            <ul>
                {
                    bookmarks.map(
                        bookmark => <Bookmark key={bookmark._id} {...bookmark} />
                    )
                }
            </ul>
        )
    }
}

export default BookmarkList