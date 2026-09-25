import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ value = 0, duration = 1500, suffix = "", prefix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const numericTarget = typeof value === 'number' ? value : parseInt(value, 10) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeProgress * numericTarget));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  if (typeof value === 'string' && isNaN(parseInt(value, 10))) {
    return <span>{value}</span>;
  }

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
