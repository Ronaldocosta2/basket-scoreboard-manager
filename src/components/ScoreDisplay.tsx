import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
    score: number;
    teamName: string;
    isHome?: boolean;
}

export const ScoreDisplay = ({ score, teamName, isHome = true }: ScoreDisplayProps) => {
    const [prevScore, setPrevScore] = useState(score);
    const [direction, setDirection] = useState(0); // 1 for up, -1 for down

    useEffect(() => {
        if (score > prevScore) {
            setDirection(1);
        } else if (score < prevScore) {
            setDirection(-1);
        }
        setPrevScore(score);
    }, [score, prevScore]);

    return (
        <div className={`flex flex-col items-center p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl ${isHome ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-br from-red-500/10 to-orange-500/10'}`}>
            <h2 className="text-3xl font-bold mb-4 tracking-wider text-foreground/90 uppercase">{teamName}</h2>

            <div className="relative h-32 w-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                        key={score}
                        custom={direction}
                        initial={{ y: direction * 50, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: direction * -50, opacity: 0, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`text-8xl font-black tabular-nums tracking-tighter ${isHome ? 'text-blue-500' : 'text-red-500'} drop-shadow-lg`}
                    >
                        {score}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        </div>
    );
};
