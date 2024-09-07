import React, { Component } from 'react';
import './App.scss';
import treeX from './dataX.json'
import treeO from './dataO.json'

const BOARD_LENGTH = 3;
const NewGameContext = React.createContext();
let gameNode;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      XisNext: true,
      squares: Array(Math.pow(BOARD_LENGTH, 2)).fill(null).map((item, index) => index + 1),
      firstPlayer: 'O'
    };
  }
  
  componentDidMount() {
    this.botFirstPlay();
  }

  botFirstPlay() {
    let firstPlayer = this.state.firstPlayer;
    if (firstPlayer == 'X') {
      gameNode = treeX;
    } else if (firstPlayer == 'O') {
      gameNode = treeO.children[0];
      const startingBoard = convertToBoard(gameNode.table);
      this.setState({
        squares: startingBoard
      });
    }
  }

  squareClick(squareKey, nextFn) {
    const squares = this.state.squares;
    const XisNext = this.state.XisNext;
    if(squares[squareKey] === 'X' || squares[squareKey] === 'O' || calculateWinner(squares) || gameHasTied(squares)) return;
    squares[squareKey] = XisNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      XisNext: !XisNext,
    }, nextFn);
  }

  userClick(squareKey) {
    this.squareClick(squareKey, this.botClick);
  }

  botClick() {
    const {squares} = this.state;
    const children = gameNode.children;
    if (children[0].children.length === 0) return;

    let playerTable = convertToTable(squares);

    for (let i = 0; i < children.length; i++) {
      if (children[i].table.every((value, index) => value === playerTable[index])) {
        gameNode = children[i].children[0];
        break;
      }
    }

    let updatedSquares = convertToBoard(gameNode.table);
    
    this.setState({ 
      squares: updatedSquares,
      XisNext: true
     });
  }

  clearGame () {
    this.setState({
      squares: Array(Math.pow(BOARD_LENGTH, 2)).fill(null).map((item, index) => index + 1),
      XisNext: true,
    }, () => {this.botFirstPlay()});
    
  }

  handleNewGame(el) {
    console.log('sss');
    this.setState({
      firstPlayer: el
    }, () => {this.clearGame()});
  }

  render() {
    const squares = this.state.squares;
    return (
      <div className='App'>
        <div className="container">
            <Header firstPlayer={this.state.firstPlayer} handleNewGame={el => this.handleNewGame(el)}></Header>
            <Board 
              squares={squares} 
              squareClick={squareKey => this.userClick(squareKey)}  
              calculateWin={() => calculateWinner(squares)}
              gameHasTied={() => gameHasTied(squares)}
              handleNewGame={el => this.handleNewGame(el)}
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

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function convertToTable(board) {
  return board.map(square =>{
    if (square === 'X') {
      return -1;
    } else if (square === 'O') {
      return 1;
    } else {
      return 0;
    }
  });
}

function convertToBoard(table) {
  return table.map((square, index) => {
    if (square === 1) {
      return 'O';
    } else if (square === -1) {
      return 'X';
    } else {
      return index + 1;
    }
  });
}


function gameHasTied (squares) {
  const numberSquares = squares.filter(el => typeof el === 'number');
  if (numberSquares.length === 0) return true;
  return false;
}



class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className='title'>Tic Tac Toe</h1>
        <h2 className="subtitle">Make your mark with Tic Tac Toe</h2>
        <Navbar clearGame={() => this.props.clearGame()} handleNewGame={el => this.props.handleNewGame(el)} firstPlayer={this.props.firstPlayer}></Navbar>
      </div>
    )
  }
}

class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <a href="https://www.wikihow.com/Play-Tic-Tac-Toe" target='_blank' rel='noreferrer' className='howto-link'>How to play!</a>
        <div className='left-nav'>
          <NewGame clearGame={() => this.props.clearGame()} handleNewGame={el => this.props.handleNewGame(el)} firstPlayer={this.props.firstPlayer}></NewGame>
        </div>
      </div>
    ) 
  }
}

class NewGame extends Component {
  static contextType = NewGameContext;
  render() {
    const block = this.props.block ? ' new-game-block' : ' ';
    return (
      // <button className={'new-game' + block} onClick={this.context}>New Game</button>
      <select value={this.props.firstPlayer} onChange={e => this.props.handleNewGame(e.target.value)}>
        <option value='X'>New Game X</option>
        <option value='O'>New Game O</option>
      </select>
    )
  }
}

class Board extends Component {
  renderBoard () {
    const rows = [];
    for(let rowIndex = 0; rowIndex < BOARD_LENGTH; rowIndex++) {
      const columns = [];
      for (let columnIndex = 0; columnIndex < BOARD_LENGTH; columnIndex++) {
        const squareKey = columnIndex + rowIndex*BOARD_LENGTH;
        columns.push(this.renderSquare(this.props.squares[squareKey], squareKey));
      }
      rows.push(<div className='row' key={rowIndex}>{columns}</div>);
    }
    return rows;
  }
  renderSquare (squareContent, key) {
    let squareClass;
    if(squareContent === 'X') {squareClass = 'XSquare'}
    else if (squareContent === 'O') {squareClass = 'OSquare'}
    else {squareClass = 'numberSquare'}
    return <Square value={squareContent} squareClass={squareClass} key={key} onClick={() => this.props.squareClick(key)}/>
  }
  render() {
    const hasPlayerWon = this.props.calculateWin() ? '' : ' hidden';
    const hasGameTied = this.props.gameHasTied() && hasPlayerWon !== '' ? '' : ' hidden';

    return (
      <div className='board'>
        <div className={'win-board' + hasPlayerWon}>
          <div className="win-text">
            Congratulations! You won!
          </div>
          <NewGame block handleNewGame={el => this.props.handleNewGame(el)}></NewGame>
        </div>
        <div className={'tie-board' + hasGameTied}>
          <div className="tie-text">
            Oh! The game tied!
          </div>
          <NewGame block handleNewGame={el => this.props.handleNewGame(el)}></NewGame>
        </div>
        {this.renderBoard()}
      </div>
    )
  }
}

class Square extends Component {
  render () {
    return (
      <button className={this.props.squareClass + ' square'} onClick={this.props.onClick}>{this.props.value}</button>
    )
  }
}

