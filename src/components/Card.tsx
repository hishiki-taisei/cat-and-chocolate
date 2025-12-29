import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Card as CardType, EventCard } from '../types';

interface CardProps {
    card?: CardType; // If null/undefined, render back of card (generic)
    isBack?: boolean; // Force back render even if card provided
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ card, isBack, isSelected, onClick, className, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-20 h-28 text-xs',
        md: 'w-32 h-48 text-sm',
        lg: 'w-64 h-96 text-lg',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                "relative rounded-xl shadow-xl cursor-pointer transition-all duration-300 select-none",
                sizeClasses[size],
                isSelected ? "ring-4 ring-yellow-400 transform -translate-y-4" : "hover:shadow-2xl",
                className
            )}
            onClick={onClick}
        >
            <div className={clsx(
                "absolute inset-0 rounded-xl overflow-hidden border-4",
                isBack || !card ? "bg-orange-400 border-white" : "bg-white border-white"
            )}>
                {/* Card Back Design */}
                {(isBack || !card) && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-300 to-orange-500">
                        <div className="text-white font-black text-2xl tracking-widest leading-none text-center drop-shadow-md">
                            キャット<br />&<br />チョコ
                        </div>
                        <div className="mt-2 w-16 h-16 opacity-50 bg-white/20 rounded-full blur-xl absolute" />
                    </div>
                )}

                {/* Card Front Design */}
                {!isBack && card && (
                    <div className="w-full h-full flex flex-col p-3 relative bg-white">
                        <div className={clsx(
                            "absolute top-0 left-0 w-full h-3",
                            card.type === 'EVENT' ? "bg-red-400" : (card.type === 'ITEM' ? "bg-blue-400" : "bg-purple-400")
                        )} />

                        <div className="mt-3 font-bold text-slate-700 leading-tight text-center text-lg">
                            {card.name}
                        </div>

                        {card.type === 'EVENT' && (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="text-xs text-slate-400 font-bold mb-1">必要なアイテム</div>
                                <div className="text-5xl font-black text-red-200">{(card as EventCard).itemCount}</div>
                            </div>
                        )}

                        {card.type === 'ITEM' && (
                            <div className="flex-1 flex items-center justify-center">
                                {/* Icon placeholder */}
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">?</div>
                            </div>
                        )}

                        {card.description && (
                            <div className="mt-auto text-xs text-slate-500 text-center">
                                {card.description}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
