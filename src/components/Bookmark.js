import React from 'react'

function Bookmark(props) {
    const { title, url } = props
    return (
        <li>
            {title} (<a href={url}>Visit</a>)
        </li>
    )
}

export default Bookmark