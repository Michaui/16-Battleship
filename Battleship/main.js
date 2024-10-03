import "./style.scss";
//import { ... } from './ship.js'
import Gameboard from "./gameboard.js";

const humanBoard = new Gameboard("human", "humanBoardID");
const computerBoard = new Gameboard("computer", "computerBoardID");

humanBoard.drawMap(); // Draw humanBoard
computerBoard.drawMap(); // Draw computerBoard
