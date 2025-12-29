import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../types';
import { Card } from './Card';
import { Button } from './Button';

interface GameBoardProps {
    gameState: GameState;
    onDrawEvent: () => void;
    onToggleItem: (id: string) => void;
    onSubmitProposal: () => void;
    onVote: (success: boolean) => void;
    onRestart: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
    gameState,
    onDrawEvent,
    onToggleItem,
    onSubmitProposal,
    onVote,
    onRestart
}) => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const isVoting = gameState.phase === 'VOTING';
    const isResult = gameState.phase === 'GAME_OVER';

    if (isResult) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-orange-50 relative overflow-hidden">
                <img src="/cat.png" className="absolute top-20 left-20 w-48 h-48 animate-bounce opacity-20" />
                <img src="/chocolate.png" className="absolute bottom-20 right-20 w-48 h-48 animate-spin-slow opacity-20" />

                <h1 className="text-6xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
                    ゲーム終了！
                </h1>
                <div className="text-3xl text-slate-700 font-bold">
                    勝者: <span className="font-black text-orange-500 text-4xl">{gameState.winningTeam === 'CAT' ? 'CAT' : (gameState.winningTeam === 'CHOCOLATE' ? 'CHOCOLATE' : '引き分け')}</span> チーム！
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-4xl p-4">
                    {/* Team Reveal */}
                    {gameState.players.map(p => (
                        <div key={p.id} className="bg-white p-5 rounded-2xl border-4 border-orange-100 shadow-lg">
                            <div className="font-black text-xl mb-2 text-slate-800">{p.name}</div>
                            <div className="text-slate-500 mb-2 font-bold">チーム: {p.team}</div>
                            <div className="text-md badge bg-orange-100 text-orange-600 inline-block px-3 py-1 rounded-full">{p.eventsWon.length} イベント獲得</div>
                        </div>
                    ))}
                </div>

                <Button size="lg" onClick={onRestart}>もう一度遊ぶ</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden bg-orange-50 text-slate-800">
            {/* Top Bar: Turn Info */}
            <header className="p-4 bg-white/80 backdrop-blur border-b-4 border-orange-100 flex justify-between items-center z-10 shadow-sm">
                <div>
                    <div className="text-xs text-orange-400 font-bold uppercase tracking-widest">現在の手番</div>
                    <div className="text-2xl font-black text-slate-800">{currentPlayer.name}</div>
                </div>
                <div className="flex gap-4">
                    {gameState.players.map((p, i) => (
                        <div key={p.id} className={`flex flex-col items-center transition-opacity ${i === gameState.currentPlayerIndex ? 'opacity-100 scale-110' : 'opacity-40'}`}>
                            <div className={`w-3 h-3 rounded-full mb-1 ${i === gameState.currentPlayerIndex ? 'bg-orange-500' : 'bg-slate-300'}`} />
                            <span className="text-xs font-bold">{p.name}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Main Play Area */}
            <main className="flex-1 relative flex flex-col items-center justify-center p-4">

                {/* Phase: DRAW_EVENT */}
                {gameState.phase === 'DRAW_EVENT' && (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-3xl font-black text-orange-500 mb-4 animate-bounce">イベントカードを引こう！</div>
                        <div
                            className="relative cursor-pointer group"
                            onClick={onDrawEvent}
                        >
                            {/* Deck visual stack */}
                            <div className="absolute top-1 left-1 w-48 h-72 bg-orange-300 rounded-xl border-4 border-white transform rotate-3 shadow-lg" />
                            <div className="absolute top-2 left-2 w-48 h-72 bg-orange-400 rounded-xl border-4 border-white transform -rotate-2 shadow-lg" />
                            <Card isBack size="lg" className="relative group-hover:-translate-y-2 transition-transform shadow-2xl" />
                        </div>
                        <p className="text-slate-400 font-bold mt-4">デッキをタップしてスタート</p>
                    </div>
                )}

                {/* Phase: SELECT_ITEMS or VOTING */}
                {(gameState.phase === 'SELECT_ITEMS' || gameState.phase === 'VOTING') && gameState.currentEvent && (
                    <div className="w-full h-full flex flex-col items-center">

                        {/* The Problem (Event) */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl relative">
                            <div className="mb-4 text-center">
                                <h2 className="text-4xl font-black text-red-500 mb-2 drop-shadow-sm">EVENT!</h2>
                                <p className="text-slate-600 text-xl font-bold"><span className="text-orange-500 text-2xl">{currentPlayer.name}</span> のピンチを救え！</p>
                            </div>

                            <Card card={gameState.currentEvent} size="lg" className="mb-8 rotate-1 shadow-2xl" />

                            {isVoting && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded-3xl"
                                >
                                    <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-orange-200 text-center">
                                        <h3 className="text-2xl font-black text-slate-800 mb-8 px-4">
                                            {currentPlayer.name} のアイデアは...
                                        </h3>
                                        <div className="flex gap-8 justify-center">
                                            <Button variant="danger" size="lg" onClick={() => onVote(false)}>失敗...</Button>
                                            <Button variant="primary" size="lg" onClick={() => onVote(true)}>成功！</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Hand Area */}
                        <div className="w-full bg-white/80 p-2 md:p-6 backdrop-blur-md border-t-4 border-orange-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-center items-end gap-2 md:gap-4 h-32 md:h-40">
                                <AnimatePresence>
                                    {currentPlayer.hand.map(item => {
                                        const isSelected = gameState.selectedItems.some(i => i.id === item.id);
                                        return (
                                            <Card
                                                key={item.id}
                                                card={item}
                                                isSelected={isSelected}
                                                onClick={() => !isVoting && onToggleItem(item.id)}
                                                className={isVoting && !isSelected ? "opacity-40 grayscale scale-90" : "hover:scale-110"}
                                                size="md"
                                            />
                                        );
                                    })}
                                </AnimatePresence>
                            </div>

                            {gameState.phase === 'SELECT_ITEMS' && (
                                <div className="mt-6 flex justify-center">
                                    <Button
                                        onClick={onSubmitProposal}
                                        disabled={gameState.selectedItems.length !== gameState.currentEvent.itemCount}
                                        className="w-72 text-lg py-3 shadow-xl"
                                    >
                                        アイテムを使う ({gameState.selectedItems.length}/{gameState.currentEvent.itemCount})
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};
