// Write your code here

import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starButton: false,
    filteredList: [],
  }

  clickStarBtn = () => {
    this.setState(prevState => ({starButton: !prevState.starButton}))
    const filteredLists = this.starredFiltered()
    this.setState({filteredList: filteredLists})
  }

  starredFiltered = () => {
    const {appointmentsList} = this.state
    return appointmentsList.filter(
      eachAppointment => eachAppointment.isLiked === true,
    )
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  addAppointments = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: v4(),
      name: title,
      time: date,
      isLiked: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  addTitle = event => {
    this.setState({title: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, starButton, filteredList} = this.state
    const starClassName = starButton ? 'star-button-clicked' : 'star-button'
    // console.log(title, date)
    // console.log(appointmentsList.length)
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top">
            <form className="input-container" onSubmit={this.addAppointments}>
              <h1 className="heading">Add Appointment</h1>
              <div className="text">
                <label className="label" htmlFor="input-text">
                  TITLE
                </label>
                <input
                  className="input-element"
                  id="input-text"
                  type="text"
                  placeholder="Title"
                  onChange={this.addTitle}
                />
              </div>
              <div className="text">
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="input-element"
                  id="date"
                  type="date"
                  onChange={this.addDate}
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="star-container">
              <h1 className="side-head">Appointments</h1>
              <button
                className={starClassName}
                type="button"
                onClick={this.clickStarBtn}
              >
                Starred
              </button>
            </div>
          </div>
          {starButton ? (
            <ul className="list-container">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  onClickStar={this.onClickStar}
                />
              ))}
            </ul>
          ) : (
            <ul className="list-container">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  onClickStar={this.onClickStar}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Appointments
