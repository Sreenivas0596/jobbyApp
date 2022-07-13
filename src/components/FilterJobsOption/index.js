import './index.css'

const FilterJobsOption = props => {
  const getEmploymentTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachEmployment => {
      const {onClickEmploymentType} = props

      const onChangeEmploymentType = event =>
        onClickEmploymentType(event.target.value)

      return (
        <li
          key={eachEmployment.employmentTypeId}
          onChange={onChangeEmploymentType}
        >
          <input
            type="checkbox"
            id={eachEmployment.employmentTypeId}
            value={eachEmployment.employmentTypeId}
            className="check-box"
          />
          <label
            htmlFor={eachEmployment.employmentTypeId}
            className="full-part-time-employment "
          >
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  const getSalaryRangesViewList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachSalary => {
      const {onClickSalaryRange} = props
      const onChangeSalaryRange = () =>
        onClickSalaryRange(eachSalary.salaryRangeId)
      return (
        <li key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            id={eachSalary.salaryRangeId}
            onChange={onChangeSalaryRange}
          />
          <label
            htmlFor={eachSalary.salaryRangeId}
            className="full-part-time-employment"
          >
            {' '}
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypeView = () => (
    <div>
      <h1 className="employment-heading"> Type Of Employment</h1>
      <ul>{getEmploymentTypeList()}</ul>
    </div>
  )

  const renderSalaryRangeView = () => (
    <div>
      <h1 className="employment-heading"> Salary Range </h1>
      <ul>{getSalaryRangesViewList()}</ul>
    </div>
  )

  return (
    <div>
      <hr />
      <div>{renderEmploymentTypeView()}</div>
      <hr />
      <div>{renderSalaryRangeView()}</div>
    </div>
  )
}

export default FilterJobsOption
