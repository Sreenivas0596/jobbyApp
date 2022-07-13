import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    ;<Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <div className="home-container">
        <div>
          <h1 className="job-heading"> Find The Job That Fits Your Life</h1>
          <p className="job-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jobs that fits your abilities and
            potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
