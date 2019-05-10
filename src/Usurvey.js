import React, { Component } from "react"
var firebase = require("firebase")
var uuid = require("uuid")

var firebaseConfig = {
  apiKey: "AIzaSyDwWyy_FYq7tURBkLcVnvuqY68ONy4HWvQ",
  authDomain: "survey-7e280.firebaseapp.com",
  databaseURL: "https://survey-7e280.firebaseio.com",
  projectId: "survey-7e280",
  storageBucket: "survey-7e280.appspot.com",
  messagingSenderId: "296922201658",
  appId: "1:296922201658:web:d9842f9b7e39d2cc"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
class Usurvey extends Component {
  state = {
    uid: uuid.v1(),
    name: "",
    answers: {
      answer1: "",
      answer2: ""
    },
    isNameSubimited: false,
    isSubmited: false
  }

  componentDidMount() {
    if (this.state.name.length > 0) {
      this.setState({ isNameSubimited: true })
    }
  }
  onChangeHandler = e => {
    const name = [e.target.name]
    const value = e.target.value
    this.setState({ [name]: value })
  }

  onSubmitHanalder = e => {
    e.preventDefault()
    this.setState({ isNameSubimited: true })
  }

  onAnswerSelected = e => {
    const answers = this.state.answers
    if (e.target.name === "answer1") {
      answers.answer1 = e.target.value
    } else if (e.target.name === "answer2") {
      answers.answer2 = e.target.value
    }
    this.setState({ answers })
  }

  questionSubmit = e => {
    e.preventDefault()
    firebase
      .database()
      .ref("uSurvey/" + this.state.uid)
      .set({ name: this.state.name, answers: this.state.answers })

    this.setState({ isSubmited: true })
  }

  render() {
    var name
    var questions
    if (
      this.state.isSubmited === false &&
      this.state.isNameSubimited === false
    ) {
      name = (
        <div>
          <h1>Hey, What's your name</h1>
          <form onSubmit={this.onSubmitHanalder}>
            <input
              className="namy"
              type="text"
              name="name"
              ref="name"
              onChange={this.onChangeHandler}
              value={this.state.name}
              placeholder="Enter your name"
            />
          </form>
        </div>
      )
      questions = ""
    } else if (this.state.name !== "" && this.state.isSubmited === false) {
      name = <h1>Hey {this.state.name}, Welcome to Userver</h1>
      questions = (
        <div>
          <h2>Here are some questions : </h2>
          <form onSubmit={this.questionSubmit}>
            <div className="card">
              <label>What kind of courses you like the most:</label>
              <br />
              <input
                type="radio"
                name="answer1"
                value="Technology"
                onChange={this.onAnswerSelected}
              />
              Technology
              <input
                type="radio"
                name="answer1"
                value="Design"
                onChange={this.onAnswerSelected}
              />
              Design
              <input
                type="radio"
                name="answer1"
                value="Marketing"
                onChange={this.onAnswerSelected}
              />
              Marketing
            </div>
            <div className="card">
              <label>Your are a:</label>
              <br />
              <input
                type="radio"
                name="answer2"
                value="Student"
                onChange={this.onAnswerSelected}
              />
              Student
              <input
                type="radio"
                name="answer2"
                value="in-job"
                onChange={this.onAnswerSelected}
              />
              in-job
              <input
                type="radio"
                name="answer2"
                value="looking-job"
                onChange={this.onAnswerSelected}
              />
              looking-job
            </div>
            <input className="feedback-button" type="submit" value="submit" />
          </form>
        </div>
      )
    } else if (this.state.isSubmited) {
      name = <h1>Thanks, {this.state.name}</h1>
    }

    return (
      <div>
        {name}
        ___________________
        {questions}
      </div>
    )
  }
}

export default Usurvey
