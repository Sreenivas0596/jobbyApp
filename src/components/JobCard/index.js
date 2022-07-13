import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    title,
    jobDescription,
    location,
    employmentType,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="jobs-container">
        <div className="logo-container">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="job-logo-img"
            />
          </div>
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="address-package-container">
          <div className="address-container">
            <GoLocation className="react-icon" />
            <p className="address">{location}</p>
            <BsBriefcase className="react-icon" />
            <p className="address">{employmentType}</p>
          </div>
          <div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="header-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
