import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';


const P5Chart = ({ maxRMSSD }) => {
   
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 150);
      p.noLoop();
      p.textAlign(p.LEFT, p.CENTER);
    };

    p.draw = () => {
      p.background(255);

      const rmssd = maxRMSSD || 0;
      const rmssdMin = 0;
      const rmssdMax = 50;

      // Stress score tussen 0 (rustig) en 100 (gestrest)
      let stressScore = p.map(rmssd, rmssdMax, rmssdMin, 0, 100);
      stressScore = p.constrain(stressScore, 0, 100);

      const totalBarWidth = p.width - 100;
      const barWidth = p.map(stressScore, 0, 100, 0, totalBarWidth);

      const segmentWidth = totalBarWidth / 3;
      const xStart = 10;
      const y = 60;
      const height = 40;

      // Kleuren: Roze (laag) → Oranje (middel) → Rood (hoog)
      const stops = [
        { color: '#ffa0d3', limit: segmentWidth },
        { color: '#eb7d31', limit: segmentWidth * 2 },
        { color: '#ff3522', limit: segmentWidth * 3 },
      ];

      // Vul met kleuren afhankelijk van breedte
      let remainingWidth = barWidth;
      for (let i = 0; i < stops.length; i++) {
        const drawWidth = Math.min(remainingWidth, segmentWidth);
        if (drawWidth > 0) {
          p.fill(stops[i].color);
          p.rect(xStart + i * segmentWidth, y, drawWidth, height);
          remainingWidth -= drawWidth;
        }
      }

   

      // Tekst boven
      p.fill(0);
      p.textSize(16);
      p.text('Stressniveau (0–100)', xStart, 30);

      // Waarde
      p.textSize(14);
      p.text(`${stressScore.toFixed(0)} / 100`, xStart + barWidth + 10, y + height / 2);

      // Schaal onderaan
      p.stroke(0);
      p.strokeWeight(1);
      p.noFill();
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

  return <ReactP5Wrapper sketch={sketch} />;
};

export default P5Chart;
