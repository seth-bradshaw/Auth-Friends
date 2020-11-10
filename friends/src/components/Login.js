import React, { Component } from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'

export default class Login extends Component {
    state = {
        credentials: {
            username: '',
            password: '',
            // isLoading: true
        }
    }

    handleChange = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', this.state.credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                // this.setState({
                //     credentials: {
                //         ...this.state.credentials, 
                //         isLoading: false
                //     }
                // })
                this.props.history.push('/friends')
                this.props.setLoggedIn(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        // if(this.state.isLoading === true){
        //     return(
        //         <p>PRACTICE FUCKING PATIENCE THIS IS LOADING</p>
        //     )
        // }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='username' value={this.state.credentials.username} onChange={this.handleChange} placeholder='Username'/>
                    <input type='password' name='password' value={this.state.credentials.password} onChange={this.handleChange} placeholder='Password'/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

