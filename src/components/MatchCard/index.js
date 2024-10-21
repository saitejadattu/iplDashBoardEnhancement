import './index.css'

const MatchCard = props => {
  const {each} = props
  const {competingTeam, competingTeamLogo, matchStatus, result} = each
  const isWin = matchStatus === 'Won' ? 'match-win' : 'match-lose'
  return (
    <li className="match-card-list-item">
      <div className="match-image-container">
        <img
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
          className="macth-card-competingTeamLogo"
        />
      </div>
      <div>
        <p className="match-competingTeam">{competingTeam}</p>
        <p className="match-result">{result}</p>
        <p className={`${isWin}`}>{matchStatus}</p>
      </div>
    </li>
  )
}
export default MatchCard
