/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface LuxuryLogoProps {
  size?: number;
  className?: string;
}

export default function LuxuryLogo({ size = 44, className = '' }: LuxuryLogoProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(197,160,89,0.35)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DFAB" />
            <stop offset="35%" stopColor="#D5AF69" />
            <stop offset="65%" stopColor="#AA8235" />
            <stop offset="100%" stopColor="#F0CE8B" />
          </linearGradient>
          <radialGradient id="glowBackdrop" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity={0.18} />
            <stop offset="70%" stopColor="#C5A059" stopOpacity={0.02} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Subtle radial luxury glow backing */}
        <circle cx="50" cy="50" r="48" fill="url(#glowBackdrop)" />

        {/* Concentric ultra-thin rotational dashboard circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          strokeDasharray="4 6 12 6"
          strokeOpacity="0.7"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />

        {/* Thick elegant gold outer diamond */}
        <path
          d="M 50 11 L 89 50 L 50 89 L 11 50 Z"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Ultra-fine inner diamond */}
        <path
          d="M 50 17 L 83 50 L 50 83 L 17 50 Z"
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          strokeOpacity="0.8"
          strokeLinejoin="round"
        />

        {/* Exquisite micro-circles at diamond terminals */}
        <circle cx="50" cy="11" r="1.5" fill="#D5AF69" className="animate-pulse" />
        <circle cx="89" cy="50" r="1.5" fill="#D5AF69" className="animate-pulse" />
        <circle cx="50" cy="89" r="1.5" fill="#D5AF69" className="animate-pulse" />
        <circle cx="11" cy="50" r="1.5" fill="#D5AF69" className="animate-pulse" />

        {/* Monogram Serif 'K' in gold gradient */}
        <text
          x="51"
          y="61"
          fontFamily="Playfair Display, Georgia, 'Times New Roman', serif"
          fontSize="34"
          fontWeight="700"
          fill="url(#goldGradient)"
          textAnchor="middle"
          letterSpacing="-0.03em"
          className="select-none"
        >
          K
        </text>
      </svg>
    </motion.div>
  );
}
