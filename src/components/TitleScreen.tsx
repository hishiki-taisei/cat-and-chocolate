import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface TitleScreenProps {
    onStartGame: (players: string[]) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame }) => {
    const [players, setPlayers] = useState<string[]>(['プレイヤー1', 'プレイヤー2', 'プレイヤー3']);
    const [newPlayerName, setNewPlayerName] = useState('');

    const addPlayer = () => {
        if (newPlayerName.trim()) {
            setPlayers([...players, newPlayerName.trim()]);
            setNewPlayerName('');
        }
    };

    const removePlayer = (index: number) => {
        if (players.length > 3) {
            setPlayers(players.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8 relative overflow-hidden">
            {/* Background Decorations */}
            <img src="/cat.png" className="absolute top-10 left-10 w-32 h-32 animate-bounce drop-shadow-xl rotate-12" alt="cat" />
            <img src="/chocolate.png" className="absolute bottom-20 right-10 w-40 h-40 animate-pulse drop-shadow-xl -rotate-12" alt="chocolate" />

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 drop-shadow-sm mb-2 tracking-tight">
                    キャット<br className="md:hidden" />& チョコレート
                </h1>
                <p className="text-orange-900/60 text-xl font-bold tracking-widest mt-2">
                    ひらめきカードゲーム
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-4 border-white shadow-2xl w-full max-w-md"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-black mb-4 text-slate-700">プレイヤー ({players.length}人)</h2>
                    <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
                        {players.map((p, i) => (
                            <div key={i} className="flex items-center justify-between bg-orange-50 p-3 rounded-2xl border border-orange-100">
                                <span className="font-bold text-slate-700">{p}</span>
                                {players.length > 3 && (
                                    <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-500 px-2 font-bold">
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            placeholder="名前を入力"
                            className="flex-1 bg-white border-2 border-orange-200 rounded-full px-4 py-2 focus:outline-none focus:border-orange-400 transition-colors text-slate-700 placeholder-orange-200"
                            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                        />
                        <Button variant="secondary" size="sm" onClick={addPlayer} disabled={!newPlayerName.trim()}>
                            追加
                        </Button>
                    </div>
                </div>

                <Button
                    size="lg"
                    onClick={() => onStartGame(players)}
                    className="w-full text-xl py-4 hover:scale-105 active:scale-95"
                >
                    ゲームスタート！
                </Button>
            </motion.div>
        </div>
    );
};
