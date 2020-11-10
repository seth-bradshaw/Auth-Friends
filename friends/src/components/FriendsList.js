import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import Friend from './Friend'

const initialState ={
    name: '',
    age: '',
    email: ''
}

export default function FriendsList() {
    const [friendList, setFriendList] = useState([])
    const [newFriend, setNewFriend] = useState(initialState)
    

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        axiosWithAuth().get('/friends')
            .then(res => {
                setFriendList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const addedFriend = {
            ...newFriend,
            id: friendList.length + 1
        }
        axiosWithAuth().post('/friends', addedFriend)
        .then(res => {
            setFriendList(res.data)
        })
        setNewFriend(initialState)
    }

    const handleChange = (e) => {
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' type='text' value={newFriend.name} onChange={handleChange} placeholder='Name' />
                <input name='age' type='text' value={newFriend.age} onChange={handleChange} placeholder='Age' />
                <input name='email' type='text' value={newFriend.email} onChange={handleChange} placeholder='Email' />
                <button>Submit</button>
            </form>
            {
                friendList.map(friend => {
                    return <Friend friend={friend} />
                })
            }
        </div>
    )
}
