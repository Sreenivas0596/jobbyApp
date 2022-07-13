import Cookies from 'js-cookie'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {userProfileDetailsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    console.log(response.ok)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const updateUserData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        userProfileDetailsList: updateUserData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        userProfileDetailsList: [],
      })
    }
  }

  renderUserProfileSuccessView = () => {
    const {userProfileDetailsList} = this.state

    console.log(userProfileDetailsList)

    const {profileImageUrl, name, shortBio} = userProfileDetailsList

    return (
      <div className="user-profile-container">
        <div>
          <img
            src={profileImageUrl}
            alt="profile"
            className="profile-img-url"
          />
          <h1 className="profile-name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderUserProfileFailureView = () => (
    <div className="failure-container">
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderUserProfileLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderUserProfileFailureView()

      case apiStatusConstants.inProgress:
        return this.renderUserProfileLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderUserProfile()}</div>
  }
}

export default UserProfile
