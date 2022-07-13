import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {skillsImageUrl, skillsName} = skillsDetails

  return (
    <li>
      <img src={skillsImageUrl} alt={skillsName} className="skills-image" />
      <h1 className="skills-title">{skillsName}</h1>
    </li>
  )
}

export default SkillsCard
