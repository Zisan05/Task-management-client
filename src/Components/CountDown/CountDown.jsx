import  { useEffect, useState } from 'react';

const CountDown = ({deadLine}) => {
     const [timeLeft, setTimeLeft] = useState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      
        useEffect(() => {
          const targetDate = new Date(deadLine).getTime();
      
          const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;
      
            if (difference > 0) {
              const days = Math.floor(difference / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
              setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
              });
            } else {
              clearInterval(timerInterval);
            }
          };
      
          const timerInterval = setInterval(calculateTimeLeft, 1000);
      
          return () => clearInterval(timerInterval);
        }, [deadLine]);

     return (
          <div className="flex justify-center items-center gap-2 red font-bold py-3 rounded">
            <div>{timeLeft.days} days</div>
            <div>{timeLeft.hours} hours</div>
            <div>{timeLeft.minutes} min</div>
            <div>{timeLeft.seconds} sec</div>
          </div>
        );
};

export default CountDown;