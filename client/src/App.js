import React, { Component } from 'react';
import './App.scss';
import treeP from './dataP.json';
import treeB from './dataB.json';

import { convertToTable, convertToBoard, calculateWinner, gameHasTied } from './utils';
import { Header, Board } from './Components';

const BOARD_LENGTH = 3;
let gameNode;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      XisNext: true,
      squares: Array(Math.pow(BOARD_LENGTH, 2)).fill(null).map((item, index) => index + 1),
      firstPlayer: 'P'
    };
  }
  
  componentDidMount() {
    this.botFirstPlay();
  }

  botFirstPlay() {
    let firstPlayer = this.state.firstPlayer;
    if (firstPlayer == 'P') {
      gameNode = treeP;
    } else if (firstPlayer == 'B') {
      gameNode = treeB.children[0];
      const startingBoard = convertToBoard(gameNode.table, firstPlayer);
      this.setState({
        squares: startingBoard,
        XisNext: false
      });
    }
  }

  
  userClick(squareKey) {
    this.squareClick(squareKey, this.botClick);
  }
  
  botClick() {
    const {squares, firstPlayer, XisNext} = this.state;
    const children = gameNode.children;
    if (children[0].children.length === 0) return;
    
    let playerTable = convertToTable(squares, firstPlayer);
    
    for (let i = 0; i < children.length; i++) {
      if (children[i].table.every((value, index) => value === playerTable[index])) {
        gameNode = children[i].children[0];
        break;
      }
    }
    
    let updatedSquares = convertToBoard(gameNode.table, firstPlayer);
    
    this.setState({ 
      squares: updatedSquares,
      XisNext: !XisNext
    });
  }

  squareClick(squareKey, nextFn) {
    const {squares, XisNext} = this.state;
    if(squares[squareKey] === 'X' || squares[squareKey] === 'O' || calculateWinner(squares) || gameHasTied(squares)) return;
    squares[squareKey] = XisNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      XisNext: !XisNext,
    }, nextFn);
  }

  clearGame () {
    this.setState({
      squares: Array(Math.pow(BOARD_LENGTH, 2)).fill(null).map((item, index) => index + 1),
      XisNext: true,
    }, () => {this.botFirstPlay()});
    
  }

  handleNewGame(el) {
    this.setState({
      firstPlayer: el
    }, () => {this.clearGame()});
  }

  render() {
    const {squares, firstPlayer} = this.state;
    return (
      <div className='App'>
        <div className="container">
            <Header
              firstPlayer={firstPlayer}
              handleNewGame={e => this.handleNewGame(e)}
            ></Header>
            <Board 
              squares={squares} 
              squareClick={squareKey => this.userClick(squareKey)}  
              calculateWin={() => calculateWinner(squares)}
              gameHasTied={() => gameHasTied(squares)}
              handleNewGame={e => this.handleNewGame(e)}
              firstPlayer={firstPlayer}
              ></Board>
          <div className="footer">
            <hr />    
            <div className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac aliquet est. Aliquam erat volutpat. Sed eget massa nisi. 
            </div> 
            <hr />    
            <div className="last-links">
              Created by <a href="/">Luiz Felipe</a>. <a href="/">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

