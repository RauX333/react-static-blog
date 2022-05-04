import * as React from "react";
import { GameContex } from "./store";

interface BoardProp {
  position: number;
}

export const Board: React.FC<BoardProp> = (props: BoardProp) => {
  const { state, dispatch } = React.useContext(GameContex);
  const symbol = state.boardState[props.position];
  const colors = symbol === -1?'text-red-500':'text-yellow-500'
  return (
    <div>
      <button
        className={`float-left bg-white border-2 border-black aspect-square w-12 ${colors}`}
        type="button"
        onClick={(): void => {
          dispatch({ name: "makeMove", value: props.position });
        }}
        disabled={symbol === 0 ? state.end : true}
      >
        {symbol !== 0 ? (symbol === -1 ? "X" : "O") : ""}
      </button>
    </div>
  );
};
