import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    // console.log(teams)
    const updatedTeamsData = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImgUrl: each.team_image_url,
    }))
    const {isLoading} = this.state
    this.setState({teamsList: updatedTeamsData, isLoading: false})
  }

  CallLoader = () => {
    const {teamsList, isLoading} = this.state
    return (
      <div>
        <Loader
          type="Oval"
          className="spinloader"
          color="#ffffff"
          width={80}
          height={80}
        />
      </div>
    )
  }

  callRemainingCode = () => {
    const {teamsList, isLoading} = this.state
    return (
      <div>
        <div className="ipl-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-main-heading">IPL Dashboard</h1>
        </div>
        <ul className="teams-card-container">
          {teamsList.map(each => (
            <TeamCard each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {teamsList, isLoading} = this.state
    // console.log(teamsList)
    return (
      <div className="bg-container">
        {isLoading ? this.CallLoader() : this.callRemainingCode()}
      </div>
    )
  }
}
export default Home
