import React, { Component } from "react";
import {
  Jumbotron,
} from "reactstrap"
import Nav from "../Nav";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";
import "./game.css"

class Game extends Component {
  state = {
    data,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      data: this.shuffleData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = data => {
    this.setState({
      data: this.resetData(data),
      score: 0
    });
  };

  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleItemClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.data.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };

  render() {
    return (
      <div>
    <Nav score={this.state.score} topScore={this.state.topScore}/>
       
        <br/><br/><br/><br/>
        <div className="container">
        <div className="row">
        <div  className="home">
      <Jumbotron>
        <h1></h1>
        <br/><br/><br/><br/>
        <p className="lead">This is a simple web application with an interactive front-end</p>
       
        <p>Using reactstrap, bootstrap, and custom components with custom css to style</p>
        <p>Try your memory and try not to click the same image twice </p>
        <p className="lead">
          
        </p>
      </Jumbotron>
      </div>
      </div>
    </div>
        
        <div className="row centerThis">
        
          {this.state.data.map(item => (
            <ClickItem
              key={item.id}
              id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleItemClick}
              image={item.image}
            />
          ))}
        
        
        </div>
        <Footer />
      </div>
    );
  }
}

export default Game;
