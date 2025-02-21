import {Component, createRef} from "react";
import { calculateWinner } from "./utils";

let BOARD_LENGTH = 3;

export class Header extends Component {
    render() {
        const {firstPlayer, handleNewGame} = this.props;
        return (
        <div className="header">
            <h1 className='title'>Tic Tac Toe</h1>
            <h2 className="subtitle">Make your mark with Tic Tac Toe</h2>
            <Navbar
                firstPlayer={firstPlayer}
                handleNewGame={e => handleNewGame(e)}
            ></Navbar>
        </div>
        )
    }
}
  
export class Navbar extends Component {
    render() {
        const {firstPlayer, handleNewGame} = this.props;
        return (
        <div className='navbar'>
            <a href="https://www.wikihow.com/Play-Tic-Tac-Toe" target='_blank' rel='noreferrer' className='howto-link'>How to play!</a>
            <div className='left-nav'>
            <NewGame
                firstPlayer={firstPlayer}
                handleNewGame={e => handleNewGame(e)}
            ></NewGame>
            </div>
        </div>
        ) 
    }
}
  
export class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.dropdownRef = createRef();
    }
    toggleDropdown = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    clickOutside = event => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.clickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    render() {
        const {firstPlayer, handleNewGame} = this.props;
        const {isOpen} = this.state;
        return (
        <div className="dropdown-container" ref={this.dropdownRef}>
            <div className="flex">
                <button className="button-main" onClick={() => handleNewGame(firstPlayer)}>{firstPlayer === 'P' ? 'Play as X' : 'Play as O'}</button>
                <button className="button-arrow" onClick={this.toggleDropdown}>
                    <img src="https://img.icons8.com/?size=100&id=85502&format=png&color=FFFFFF" alt="dropdown arror"/>
                </button>
            </div>
            <div>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <li onClick={() => {handleNewGame('P'); this.toggleDropdown()}} className="dropdown-item">Play as X</li>
                        <li onClick={() => {handleNewGame('B'); this.toggleDropdown()}} className="dropdown-item">Play as O</li>
                    </ul>
                )}
            </div>
        </div>
        )
    }
}
  
export class Board extends Component {
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
        const {firstPlayer, handleNewGame, squares} = this.props;
        const winStatus = calculateWinner(squares);
        const hasPlayerWon = ((winStatus === 'X' && firstPlayer === 'P') || (winStatus === 'O' && firstPlayer === 'B'));
        const hasBotWon = ((winStatus === 'O' && firstPlayer === 'P') || (winStatus === 'X' && firstPlayer === 'B')); 
        const hasGameTied = this.props.gameHasTied() && !winStatus ? '' : ' hidden';

        return (
        <div className='board'>
            <div className={'win-board' + (hasPlayerWon ? ' player-win': ' hidden')}>
                <div className="win-text">
                    Congratulations! You won!
                </div>
                <NewGame
                    firstPlayer={firstPlayer}
                    handleNewGame={e => handleNewGame(e)}
                ></NewGame>
            </div>
            <div className={'win-board' + (hasBotWon ? ' bot-win': ' hidden')}>
                <div className="win-text">
                    Bot won!!
                </div>
                <NewGame
                    firstPlayer={firstPlayer}
                    handleNewGame={e => handleNewGame(e)}
                ></NewGame>
            </div>
            <div className={'tie-board' + hasGameTied}>
            <div className="tie-text">
                Oh! The game tied!
            </div>
            <NewGame
                firstPlayer={firstPlayer}
                handleNewGame={e => handleNewGame(e)}
            ></NewGame>
            </div>
            {this.renderBoard()}
        </div>
        )
    }
}
  
export class Square extends Component {
    render () {
        return (
        <button className={this.props.squareClass + ' square'} onClick={this.props.onClick}>{this.props.value}</button>
        )
    }
}