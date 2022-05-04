import * as React from "react";

export interface State {
  players: ["Bob", "Tod"];
  boardState: number[];
  result: number;
  moveCount: number;
  end: boolean;
}

export const initState: State = {
  players: ["Bob", "Tod"],
  boardState: Array(9).fill(0),
  result: 0,
  moveCount: 0,
  end: false,
};

export interface Action {
  name: "makeMove" | "restore";
  value: number;
}

export const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.name) {
    case "makeMove":
      let a: number[] = state.boardState.slice();
      const player = state.moveCount % 2;
      if (player === 0) {
        a[action.value!] = -1;
      } else {
        a[action.value!] = 1;
      }

      const result = isGameEnd(a, state.moveCount + 1);
      let end = false;
      if (result !== 0 || state.moveCount + 1 === 9) {
        end = true;
      }

      return {
        ...state,
        boardState: a,
        result: result,
        end: end,
        moveCount: state.moveCount + 1,
      };
    case "restore":
      return { ...initState };
  }
};

export const GameContex = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => {
    throw new Error("StoreContext 未定义");
  },
});

const isGameEnd = (board: number[], moveCount: number): number => {
  console.log("judge game end",moveCount);
  if (moveCount < 5) {
    return 0;
  }
  const startArray: number[] = [0, 1, 2, 0, 3, 6, 0, 2];
  const skipArray: number[] = [3, 3, 3,1, 1, 1, 4, 2];
  const size: number = 3;

  for (let index = 0; index < startArray.length; index++) {
    let sum: number = 0;
    for (let j = 0; j < size; j++) {
      const boardIndex = startArray[index] + j * skipArray[index];
  
      sum += board[boardIndex];
    }
    
    if (Math.abs(sum) === size) {
      return sum / size;
    }
  }
  return 0;
};
