import React from 'react'

const Notification = ({ notiClass, content }) => {
    // if ({message} === null) {
    //     return null
    // }

    // return (
    //     <div>
    //         {message}
    //     </div>
    // )

    if (({content} === null) || ({notiClass} === 'noNoti')) {
        return null
    }

    return (
        <div className={notiClass}>
            {content}
        </div>
    )
}

export default Notification