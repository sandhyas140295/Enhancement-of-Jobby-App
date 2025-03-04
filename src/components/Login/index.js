import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErr: false, errorMsg: ''}

  getLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const err = data.error_msg
      this.setState({errorMsg: err, showErr: true})
    }
  }

  onSubmitFrom = event => {
    event.preventDefault()
    this.getLogin()
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErr, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitFrom}>
            <div>
              <label htmlFor="username" className="username-label">
                USERNAME
              </label>
              <input
                id="username"
                placeholder="Username"
                type="text"
                onChange={this.onChangeUsername}
                value={username}
                className="username-input-el"
              />
            </div>
            <div>
              <label htmlFor="password" className="password-label">
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                onChange={this.onChangePassword}
                value={password}
                className="password-input-el"
              />
            </div>
            <button className="btn-login" type="submit">
              Login
            </button>
            {showErr && <p className="err-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
