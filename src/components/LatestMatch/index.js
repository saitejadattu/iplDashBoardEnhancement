
import './index.css'

const LatestMatch = props => {
  const {latestmathData} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestmathData
  return (
    <ul className="latest-match-details-container">
      <li className="match-venue-details-container-a">
        <p className="competingTeam-text">{competingTeam}</p>
        <p className="competingTeam-text">{date}</p>
        <p className="venue-text">{venue}</p>
        <p className="matchStatus-text">{result}</p>
      </li>
      <div className="competingTeamLogo-container">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competingTeam-logo"
        />
      </div>
      <li className="match-venue-details-container-b">
        <p className="competingTeam-text-a">first Innings</p>
        <p className="competingTeam-text-b">{firstInnings}</p>
        <p className="competingTeam-text-a">seccond Innings</p>
        <p className="competingTeam-text-b">{secondInnings}</p>
        <p className="competingTeam-text-a">man Of The Match</p>
        <p className="competingTeam-text-b">{manOfTheMatch}</p>
        <p className="competingTeam-text-a">umpires</p>
        <p className="competingTeam-text-b">{umpires}</p>
      </li>
    </ul>
  )
}

export default LatestMatch
