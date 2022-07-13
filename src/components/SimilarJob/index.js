import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'

const SimilarJob = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="jobs-container">
      <div className="logo-container">
        <div>
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
    </li>
  )
}

export default SimilarJob
