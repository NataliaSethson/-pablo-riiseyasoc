'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

export default function ContadorAnimado({ valorFinal, prefijo = '', sufijo = '', duracion = 5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const [numeroMostrado, setNumeroMostrado] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Easing 'easeOut' fluido y duración aumentada a 5s por defecto
      const controls = animate(motionValue, valorFinal, {
        duration: duracion,
        ease: 'easeOut', // Transición constante y gradual
        onUpdate: (latest) => {
          setNumeroMostrado(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, motionValue, valorFinal, duracion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefijo}
      {numeroMostrado.toLocaleString()}
      {sufijo}
    </span>
  );
}