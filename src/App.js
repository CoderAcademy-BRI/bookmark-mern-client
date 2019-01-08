import React, { Fragment, Component } from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import api from './api/init'
import Signin from './components/Signin'
import BookmarkList from './components/BookmarkList'
import Bookmark from './components/Bookmark'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loginError: null
    }
  }

  // Handles user signin 
  // Form is rendered in Signin component
  // Sets token.email in the state so we know we are logged in
  // Fetches bookmarks from server
  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let tokenEmail = { email: response.data.email }
      this.setState({ token: tokenEmail })
    } catch (error) {
      this.setState({ loginError: error.message })
    }
  }

  // Handles signout
  // Calls logout on server
  // Unsets bookmarks
  // Unsets token
  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      this.setState({ token: null })
    })
  }

  render() {
    const loggedInEmail = this.state.token && this.state.token.email
    return (
      <div >
        <h1>Bookmarks</h1>
        <Router>
          <Fragment>
            <Route exact path="/" render={(props) => {
              return <Redirect to='/bookmarks' />
            }} />
            <Route exact path="/login" render={(props) => {
              if (loggedInEmail) {
                return (<Redirect to="/bookmarks" />)
              } else {
                return (<Signin loginError={this.state.loginError} handleSignIn={this.handleSignIn} />)
              }
            }
            } />
            <Route exact path="/bookmarks" component={BookmarkList} />
            <Route exact path="/bookmarks/:id" component={Bookmark} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
