import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import UserProfile from '../UserProfile'

import FilterJobsOption from '../FilterJobsOption'

import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobsSection extends Component {
  state = {
    allJobsSectionList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
  }

  componentDidMount() {
    this.getAllJobsData()
  }

  getAllJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const {employmentType, salaryRange, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      console.log(data)

      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        id: eachJob.id,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        allJobsSectionList: updatedJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        allJobsSectionList: [],
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = event => {
    if (event.key === 'Enter') {
      this.getAllJobsData()
    }
  }

  onClickSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getAllJobsData)
  }

  onClickEmploymentType = employmentType => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, employmentType],
      }),
      this.getAllJobsData,
    )
  }

  renderAllJobsSuccessView = () => {
    const {allJobsSectionList, searchInput} = this.state
    const showAllJobs = allJobsSectionList.length > 0

    const filteredJobsList = allJobsSectionList.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return showAllJobs > 0 ? (
      <div className="all-products-container">
        <div className="input-search-container">
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            placeholder="Search"
            className="input"
            onClick={this.onSearch}
          />
          <button
            type="button"
            className="button-search"
            onClick={this.getAllJobsData}
            testid="searchButton"
          >
            <BsSearch className="search-react" />
          </button>
        </div>
        <ul className="products-list">
          {filteredJobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="job-title">No Jobs Found</h1>
        <p className="address">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobsFailureView = () => (
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
        <button type="button" className="button" onClick={this.getAllJobsData}>
          Retry
        </button>
      </div>
    </div>
  )

  renderAllJobsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderAllJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderAllJobsLoadingView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="all-products-section">
        <div>
          <div className="mobile-search-container">
            <input
              text="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              placeholder="Search"
              className="input"
              onClick={this.onSearch}
            />
            <button
              type="button"
              className="button-search"
              onClick={this.getAllJobsData}
            >
              <BsSearch className="search-react" />
            </button>
          </div>
        </div>
        <div className="profile-filter-container">
          <div>
            <UserProfile />
          </div>
          <FilterJobsOption
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            getAllJobsData={this.getAllJobsData}
            searchInput={searchInput}
            onClickEmploymentType={this.onClickEmploymentType}
            onClickSalaryRange={this.onClickSalaryRange}
          />
        </div>

        <div>{this.renderAllJobs()}</div>
      </div>
    )
  }
}

export default AllJobsSection
