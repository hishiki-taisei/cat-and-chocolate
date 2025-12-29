import { TitleScreen } from './components/TitleScreen';
import { GameBoard } from './components/GameBoard';
import { useGame } from './hooks/useGame';

function App() {
  const {
    gameState,
    initGame,
    drawEvent,
    toggleItemSelection,
    submitProposal,
    resolveTurn
  } = useGame();

  if (!gameState) {
    return <TitleScreen onStartGame={initGame} />;
  }

  return (
    <GameBoard
      gameState={gameState}
      onDrawEvent={drawEvent}
      onToggleItem={toggleItemSelection}
      onSubmitProposal={submitProposal}
      onVote={resolveTurn}
      onRestart={() => window.location.reload()} // Simple restart for now
    />
  );
}

export default App;
