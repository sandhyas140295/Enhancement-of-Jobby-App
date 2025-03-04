import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onclickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo-header"
        />
      </Link>
      <ul className="link-container">
        <li>
          <Link to="/" className="link-home-sm">
            <AiFillHome />
          </Link>
          <Link to="/" className="link-home-lg">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-jobs-sm">
            <BsFillBriefcaseFill />
          </Link>
          <Link to="/jobs" className="link-jobs-lg">
            Jobs
          </Link>
        </li>
        <li>
          <button
            label="logout"
            type="button"
            className="btn-logout icon"
            onClick={onclickLogout}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
      <button
        type="button"
        className="btn-logout button-el"
        onClick={onclickLogout}
      >
        logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
