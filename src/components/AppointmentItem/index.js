// Write your code here
// <h1>{format(new Date(), 'dd MMMM yyyy, EEEE')}</h1>

import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onClickStar} = props
  const {name, time, isLiked, id} = eachAppointment
  const postTime = format(new Date(time), 'dd MMMM yyyy, EEEE')
  const star = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const clickStar = () => {
    onClickStar(id)
  }
  return (
    <li className="list-item">
      <div className="name-cont">
        <p className="name">{name}</p>
        <button className="star-list" type="button" testid="star">
          <img src={star} alt="star" onClick={clickStar} />
        </button>
      </div>
      <p className="date">{`Date: ${postTime}`}</p>
    </li>
  )
}

export default AppointmentItem
