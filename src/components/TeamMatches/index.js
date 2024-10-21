
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
// import {PieChart, Pie} from 'recharts'
// const data01 = [
//   {name: 'Product A', value: 400},
//   {name: 'Product B', value: 300},
//   {name: 'Product C', value: 300},
//   {name: 'Product D', value: 200},
// ]
// const data02 = [
//   {name: 'Category X', value: 100},
//   {name: 'Category Y', value: 200},
//   {name: 'Category Z', value: 300},
//   {name: 'Category W', value: 400},
// ]
class TeamMatches extends Component {
  state = {
    latestmathData: {},
    receentMatchData: [],
    banner: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  watchMyBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const reponse = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await reponse.json()

    console.log(data)
    const updatedLatestMatchDetails = {
      id: data.latest_match_details.id,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }
    const updatedReceentMatchData = data.recent_matches.map(each => ({
      id: each.id,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      date: each.date,
      firstInnings: each.first_innings,
      manOfTheMatch: each.man_of_the_match,
      matchStatus: each.match_status,
      result: each.result,
      secondInnings: each.second_innings,
      umpires: each.umpires,
      venue: each.venue,
    }))
    // console.log(data.recent_matches)
    // console.log(updatedReceentMatchData)
    const {isLoading} = this.state
    this.setState({
      receentMatchData: updatedReceentMatchData,
      isLoading: !isLoading,
    })
    this.setState({
      latestmathData: updatedLatestMatchDetails,
      banner: data.team_banner_url,
    })
    // console.log(data)
  }

  render() {
    const {banner, latestmathData, receentMatchData, isLoading} = this.state
    return (
      <div className="bg-team-matches-container">
        {isLoading ? (
          <div>
            <Loader
              className="spinloader"
              type="Oval"
              color="#ffffff"
              width={80}
              height={80}
            />
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="back-button"
              onClick={this.watchMyBack}
            >
              Back
            </button>
            <img src={banner} alt="team banner" className="banner-image" />
            <p className="latest-match-text">Latest Matches</p>
            <LatestMatch latestmathData={latestmathData} />
            <ul className="match-card-un-ordered-list">
              {receentMatchData.map(each => (
                <MatchCard key={each.id} each={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
// <PieChart width={730} height={250}>
//   <Pie
//     data={receentMatchData.matchStatus}
//     dataKey="value"
//     nameKey="name"
//     cx="50%"
//     cy="50%"
//     outerRadius={50}
//     fill="#8884d8"
//   />
//   <Pie
//     dataKey="value"
//     nameKey="name"
//     cx="50%"
//     cy="50%"
//     innerRadius={60}
//     outerRadius={80}
//     fill="#82ca9d"
//     label
//   />
// </PieChart>
