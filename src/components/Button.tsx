import type { ComponentProps } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends Omit<ComponentProps<typeof motion.button>, 'ref'> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
    const variants = {
        primary: 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-orange-500/50 hover:from-orange-500 hover:to-pink-600 border-2 border-white',
        secondary: 'bg-yellow-300 text-yellow-900 hover:bg-yellow-400 border-2 border-white shadow-yellow-400/50',
        danger: 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-red-500/50 hover:from-red-500 hover:to-rose-600 border-2 border-white',
    };

    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-6 py-2 text-base',
        lg: 'px-8 py-3 text-lg font-bold',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                "rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-black tracking-wide",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
