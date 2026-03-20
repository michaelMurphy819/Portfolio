'use client';
import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  strings: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
}

export function TypingAnimation({
  strings,
  speed = 60,
  deleteSpeed = 30,
  pauseMs = 2000,
  className = '',
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => {
        setPaused(false);
        setDeleting(true);
      }, pauseMs);
      return () => clearTimeout(t);
    }

    const current = strings[stringIndex];

    if (!deleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, speed);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setStringIndex((i) => (i + 1) % strings.length);
      }
    }
  }, [charIndex, deleting, paused, stringIndex, strings, speed, deleteSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-green-500">▋</span>
    </span>
  );
}
