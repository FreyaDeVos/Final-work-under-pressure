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

      const value = maxRMSSD || 0;
      const maxValue = 50; // max RMSSD schaal
      const barWidth = p.map(value, 0, maxValue, 0, p.width - 100); // horizontale breedte

      // Titel - weg te laten 
      p.fill(0);
      p.textSize(16);
      p.text('Hoogste RMSSD (ms)', 10, 30);

      // Balk (horizontaal)
      p.fill('#66b3ff');
      p.rect(10, 60, barWidth, 40);

      // eindwaarde van balk
      p.fill(0);
      p.textSize(14);
      p.text(`${value.toFixed(2)} ms`, 20 + barWidth, 80);
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default P5Chart;
