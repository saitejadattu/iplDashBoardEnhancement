import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import Legend from '../Legend'
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
    let data0 = [
      {name: 'lost', value: 0},
      {name: 'won', value: 0},
    ]
    receentMatchData.map(each => {
      if (each.matchStatus === 'Lost') {
        data0[0].value += 1
      } else {
        data0[1].value += 1
      }
    })
    // console.log(data0)
    return (
      <div className="bg-team-matches-container">
        {isLoading ? (
          <div testid="loader">
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
        <Legend data0={data0} />
      </div>
    )
  }
}
export default TeamMatches
