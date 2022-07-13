import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    submitError: false,
    errorMessage: '',
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({submitError: true, errorMessage: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  renderPassword = () => {
    const {passwordInput} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="password-input"
          value={passwordInput}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUserName = () => {
    const {usernameInput} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="username-input"
          value={usernameInput}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {submitError, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <form className="form-card-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-img"
          />
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {submitError && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
