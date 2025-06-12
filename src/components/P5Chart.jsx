import React, { useRef, useEffect, useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import styles from './P5Chart.module.css';

const P5Chart = ({ maxRMSSD }) => {
  const containerRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(600); // startwaarde
  const canvasHeight = 150; // vaste hoogte

  // Meet container breedte en update canvas width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasWidth(width);
      }
    };
    updateWidth();

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      p.textAlign(p.LEFT, p.CENTER);
      p.textFont('EXO');
    };

    p.windowResized = () => {
      p.resizeCanvas(canvasWidth, canvasHeight);
      p.redraw();
    };

    p.draw = () => {
      const rmssd = maxRMSSD || 0;
      const rmssdMin = 0;
      const rmssdMax = 50;

      let stressScore = p.map(rmssd, rmssdMax, rmssdMin, 0, 100);
      stressScore = p.constrain(stressScore, 0, 100);

      // Pas totalBarWidth aan op basis van canvasWidth
      const totalBarWidth = canvasWidth - 100;
      const barWidth = p.map(stressScore, 0, 100, 0, totalBarWidth);

      const segmentWidth = totalBarWidth / 3;
      const xStart = 10;
      const y = 60;
      const height = 40;

      const stops = [
        { color: '#ffa0d3', limit: segmentWidth },
        { color: '#eb7d31', limit: segmentWidth * 2 },
        { color: '#ff3522', limit: segmentWidth * 3 },
      ];

      let remainingWidth = barWidth;
      for (let i = 0; i < stops.length; i++) {
        const drawWidth = Math.min(remainingWidth, segmentWidth);
        if (drawWidth > 0) {
          p.fill(stops[i].color);
          p.rect(xStart + i * segmentWidth, y, drawWidth, height);
          remainingWidth -= drawWidth;
        }
      }

      p.fill(0);
      p.textSize(16);
      p.text('Stressniveau (0–100)', xStart, 30);
      p.line(xStart, 105, xStart + totalBarWidth, 105);
      for (let i = 0; i <= 5; i++) {
        const x = xStart + (totalBarWidth / 5) * i;
        p.line(x, 100, x, 110);
        p.noStroke();
        p.fill(0);
        p.text(`${i * 20}`, x - 5, 120);
        p.stroke(0);
      }
    };
  };

  return (
    <div ref={containerRef} className={styles.chartContainer}>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default P5Chart;
