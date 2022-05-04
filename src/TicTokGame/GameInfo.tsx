import { useContext } from "react";
import { GameContex } from "./store";

export const GameInfo: React.FC = () => {
  const { state, dispatch } = useContext(GameContex);

  return (
    <div className="text-white ml-4 inline-block align-top w-36 text-left text-lg leading-10">
      {state.result !== 0 && (
        <div>
          <p>Game End!</p>
          <p>Winner is <span className="font-bold">{state.players[Math.abs(state.moveCount - 1) % 2]}</span></p>
        </div>
      )}
      {state.result === 0 && state.end && (
        <div>
          <p>It's a DRAW!</p>
        </div>
      )}
      {state.end && (
        <button className="border-2 p-0 bg-white text-black hover:bg-slate-100" onClick={():void=>{dispatch({name:'restore',value:11})}}>Restart</button>
      )}
      {!state.end && <p>Now Player: {state.players[state.moveCount % 2]}</p>}
    </div>
  );
};
