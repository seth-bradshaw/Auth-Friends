import React from 'react'

export default function Friend(props) {
    return (
        <div>
            <h3>{props.friend.name}</h3>
            <p>{props.friend.age}</p>
            <p>{props.friend.email}</p>
        </div>
    )
}
