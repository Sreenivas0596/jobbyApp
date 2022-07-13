import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcase} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'

import SkillsCard from '../SkillsCard'
import SimilarJob from '../SimilarJob'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/jobs/'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobsListDetails extends Component {
  state = {
    allJobsDetailsList: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllJobsDetailsList()
  }

  getAllJobsDetailsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(`${apiUrl}${id}`, options)

    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()

      console.log(data)

      const updateAllJobsDetailsList = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        title: data.job_details.title,
        lifeAtCompany: {
          lifeAtCompDescription: data.job_details.life_at_company.description,
          lifeAtCompImageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(eachSkill => ({
          skillsImageUrl: eachSkill.image_url,
          skillsName: eachSkill.name,
        })),
      }

      const updateSimilarJobsList = data.similar_jobs.map(eachSimilar => ({
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        id: eachSimilar.id,
        jobDescription: eachSimilar.job_description,
        rating: eachSimilar.rating,
        location: eachSimilar.location,
        title: eachSimilar.title,
      }))
      this.setState({
        allJobsDetailsList: updateAllJobsDetailsList,
        similarJobsList: updateSimilarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        allJobsDetailsList: [],
        similarJobsList: [],
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderAllJobsDetailsSuccessView = () => {
    const {allJobsDetailsList, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      rating,
      packagePerAnnum,
      title,
      skills,
    } = allJobsDetailsList

    const {lifeAtCompDescription, lifeAtCompImageUrl} = lifeAtCompany

    return (
      <div>
        <div className="jobs-container">
          <div className="logo-container">
            <div>
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
          <div className="desc-link-container">
            <h1 className="description-heading">Description</h1>
            <div className="external-link">
              <a href={companyWebsiteUrl} className="website-link">
                {' '}
                Visit{' '}
              </a>
              <BiLinkExternal className="external-icon" />
            </div>
          </div>
          <p className="description">{jobDescription}</p>

          <h1 className="title"> Skills </h1>
          <ul>
            {skills.map(eachSkill => (
              <SkillsCard skillsDetails={eachSkill} key={eachSkill.id} />
            ))}
          </ul>

          <h1 className="title"> Life at Company</h1>

          <div>
            <p className="skills-title">{lifeAtCompDescription}</p>
            <div>
              <img src={lifeAtCompImageUrl} alt="life at company" />
            </div>
          </div>
        </div>

        <h1 className="title"> Similar Jobs </h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(eachSimilar => (
            <SimilarJob similarJobDetails={eachSimilar} key={eachSimilar.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllJobsDetailsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-title">Oops! Something went wrong</h1>
      <p className="address">
        We cannot seem to find the page you are looking for
      </p>
      <div>
        <button
          type="button"
          className="button"
          onClick={this.getAllJobsDetailsList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsDetailsSuccessView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderAllJobsDetailsFailureView()

      default:
        return null
    }
  }

  render() {
    const {allJobsDetailsList, similarJobsList} = this.state
    console.log(allJobsDetailsList)
    console.log(similarJobsList)

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="all-jobs-details">{this.renderAllJobsDetails()}</div>
      </div>
    )
  }
}

export default AllJobsListDetails
