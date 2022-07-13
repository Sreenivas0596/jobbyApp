import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="home-job-list">
            <li className="home-list">
              <Link to="/" className="nav-link">
                <AiFillHome className="ai-home" />
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-link">
                <BsBriefcase className="bs-home" />
              </Link>
            </li>
          </ul>
          <button type="button" className="nav-mobile-btn">
            <FiLogOut className="bs-home" onClick={onClickLogout} />
          </button>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
