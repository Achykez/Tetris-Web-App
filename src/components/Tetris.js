import React, { useState } from "react";

import { checkCollison, createStage } from "../gameHelpers";

//Custom Hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

// Components
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";


//Styled Components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);


  console.log("re-render");


  const movePlayer = dir => {
    if (!checkCollison(player, stage, {x: dir, y: 0})) {
    updatePlayerPos({x: dir, y: 0});

    }

  }

  const startGame = () => {
    //Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);

  }

  const drop = () => {
    if (!checkCollison(player, stage, {x: 0, y: 1})){
      updatePlayerPos({x:0, y:1, collided:false})
    } else {
      //Gameover
      if (player.pos.y < 1) {
        console.log('YOU SUCK!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x:0, y:1, collided:true});
    }
    

  }

  const dropPlayer = () => {
    drop();

  }

  const move = ({keyCode}) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
    } else if (keyCode === 39) {
      movePlayer(1);
    }else if (keyCode === 40) {
      dropPlayer();  
    }
  }
  }

  
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="YOU SUCK" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}

          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
