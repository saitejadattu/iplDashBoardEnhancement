
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {each} = props
  const {teamImgUrl, id, name} = each
  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-card-list-item">
        <img src={teamImgUrl} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
