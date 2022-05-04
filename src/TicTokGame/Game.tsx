import * as React from "react";
import { Board } from "./Board";
import { GameInfo } from "./GameInfo";

import { GameContex, reducer, initState } from "./store";
const { useReducer } = React;

export const Game: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  let board = state.boardState.map((e, index) => {
    return <Board key={index} position={index}></Board>;
  });
  return (
    <div className="bg-slate-600 min-h-screen text-center">
      <header className="h-12 ">
        <h1 className="text-white ">  Tik-TOC-TOE</h1>
      </header>

      <GameContex.Provider value={{ state, dispatch }}>
        <div className="w-48 inline-block">
          <div className="w-36 h-36 ">{board}</div>
        </div>

        <GameInfo></GameInfo>
      </GameContex.Provider>
    </div>
  );
};
