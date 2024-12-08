'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  targetDate: string;
  targetTime: string;
}

export const Timer = ({ targetDate, targetTime }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(`${targetDate}T${targetTime}`);
      const now = new Date();
      const difference = targetDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 초기 계산
    calculateTimeLeft();

    // 1초마다 업데이트
    const timer = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  // 숫자를 2자리로 패딩
  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="font-roboto-mono text-3xl text-f1-red font-bold">
      {padNumber(timeLeft.days)}D : {padNumber(timeLeft.hours)}H : {padNumber(timeLeft.minutes)}M : {padNumber(timeLeft.seconds)}S
    </div>
  );
}; 