import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import statsStyles from './Statistics.module.css';

const Statistics1 = ({ hrvData, onNextPage }) => {
  const p5ContainerRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoTimer, setVideoTimer] = useState(0);
  const [collectedHRV, setCollectedHRV] = useState([]);
  const [highestHRV, setHighestHRV] = useState(0);

  useEffect(() => {
    let timer;
    if (isVideoPlaying && videoTimer < 40) {
      timer = setInterval(() => {
        setVideoTimer(prev => prev + 1);
      }, 1000);
    } else if (videoTimer >= 40) {
      setIsVideoPlaying(false);
      // Na 40 seconden automatisch naar volgende pagina
      setTimeout(() => {
        onNextPage?.();
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isVideoPlaying, videoTimer, onNextPage]);

  // Verzamel HRV data tijdens video
  useEffect(() => {
    if (isVideoPlaying && hrvData?.rrIntervals) {
      const rmssd = calculateRMSSD(hrvData.rrIntervals);
      if (rmssd > 0) {
        setCollectedHRV(prev => {
          const newData = [...prev, rmssd];
          const maxHRV = Math.max(...newData);
          setHighestHRV(maxHRV);
          return newData;
        });
      }
    }
  }, [hrvData, isVideoPlaying]);

  // P5.js sketch voor staafdiagram
  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(600, 400);
      };

      p.draw = () => {
        p.background(240);
        
        // Titel
        p.fill(0);
        p.textAlign(p.CENTER);
        p.textSize(24);
        p.text('Hoogste HRV Meting', p.width / 2, 30);
        
        if (collectedHRV.length > 0) {
          drawBarChart(p);
        } else {
          // Wacht op data
          p.textSize(16);
          p.text('Wachten op HRV metingen...', p.width / 2, p.height / 2);
        }
        
        // Timer weergave
        p.textAlign(p.LEFT);
        p.textSize(16);
        p.fill(100);
        p.text(`Timer: ${videoTimer}/40s`, 20, 30);
        
        // Hoogste HRV waarde
        if (highestHRV > 0) {
          p.textAlign(p.RIGHT);
          p.fill(0, 150, 0);
          p.text(`Hoogste HRV: ${highestHRV} ms`, p.width - 20, 30);
        }
      };

      const drawBarChart = (p) => {
        const margin = 80;
        const chartWidth = p.width - 2 * margin;
        const chartHeight = p.height - 2 * margin;
        const maxValue = Math.max(...collectedHRV, 100);
        
        // Laatste 10 metingen tonen
        const recentData = collectedHRV.slice(-10);
        const barWidth = chartWidth / Math.max(recentData.length, 1);
        
        recentData.forEach((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;
          const x = margin + index * barWidth;
          const y = p.height - margin - barHeight;
          
          // Kleur bepalen (hoger = groener = rustiger)
          const normalizedValue = value / maxValue;
          p.fill(255 - normalizedValue * 255, 255, 255 - normalizedValue * 255);
          p.stroke(0);
          p.rect(x, y, barWidth - 2, barHeight);
          
          // Waarde boven staaf
          p.fill(0);
          p.textAlign(p.CENTER);
          p.textSize(12);
          p.text(Math.round(value), x + barWidth / 2, y - 5);
        });
        
        // As-labels
        p.fill(0);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text('HRV Metingen (RMSSD in ms)', p.width / 2, p.height - 10);
        
        // Y-as schaal
        p.textAlign(p.RIGHT);
        for (let i = 0; i <= 5; i++) {
          const y = p.height - margin - (i / 5) * chartHeight;
          const value = Math.round((i / 5) * maxValue);
          p.text(value, margin - 10, y + 5);
          
          // Grid lijnen
          p.stroke(200);
          p.line(margin, y, p.width - margin, y);
        }
      };
    };

    if (p5ContainerRef.current) {
      const p5Instance = new p5(sketch, p5ContainerRef.current);
      return () => p5Instance.remove();
    }
  }, [collectedHRV, videoTimer, highestHRV]);

  const calculateRMSSD = (rrIntervals) => {
    if (!rrIntervals || rrIntervals.length < 2) return 0;
    
    const differences = [];
    for (let i = 1; i < rrIntervals.length; i++) {
      const diff = rrIntervals[i] - rrIntervals[i - 1];
      differences.push(diff * diff);
    }
    
    const meanDiff = differences.reduce((a, b) => a + b, 0) / differences.length;
    return Math.round(Math.sqrt(meanDiff));
  };

  const startMeasurement = () => {
    setIsVideoPlaying(true);
    setVideoTimer(0);
    setCollectedHRV([]);
    setHighestHRV(0);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={6} currentPage={3} onPageChange={() => {}} />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>
      
      <div className={styles.mainContent}>
        <div className={statsStyles.statisticsContainer}>
          <h2 className={statsStyles.title}>Statistieken 1: Hoogste HRV</h2>
          
          {!isVideoPlaying && videoTimer === 0 && (
            <div className={statsStyles.controlSection}>
              <p className={statsStyles.subtitle}>Druk op start om de 40-seconde ontspanningsvideo te beginnen</p>
              <button onClick={startMeasurement} className={statsStyles.startButton}>
                🧘‍♀️ Start Ontspanning
              </button>
            </div>
          )}
          
          {isVideoPlaying && (
            <div className={statsStyles.videoSection}>
              <div className={statsStyles.statusIndicator + ' ' + statsStyles.measuring}>
                📊 Meting in uitvoering...
              </div>
              <div className={`${statsStyles.videoPlaceholder} ${statsStyles.relaxVideoPlaceholder}`}>
                🌅 Ontspanningsvideo - {40 - videoTimer}s resterend
              </div>
              <div className={statsStyles.timer}>{40 - videoTimer}s</div>
            </div>
          )}
          
          <div ref={p5ContainerRef} className={statsStyles.chartContainer} />
          
          {videoTimer >= 40 && (
            <div className={statsStyles.resultsSection}>
              <div className={statsStyles.statusIndicator + ' ' + statsStyles.completed}>
                ✅ Meting voltooid!
              </div>
              <div className={`${statsStyles.resultValue} ${statsStyles.highestHRV}`}>
                Jouw hoogste HRV: {highestHRV} ms
              </div>
              <div className={
                highestHRV > 50 ? `${statsStyles.resultMessage} ${statsStyles.excellentResult}` :
                highestHRV > 30 ? `${statsStyles.resultMessage} ${statsStyles.goodResult}` :
                `${statsStyles.resultMessage} ${statsStyles.concernResult}`
              }>
                {highestHRV > 50 ? '🟢 Uitstekende rust en ontspanning!' : 
                 highestHRV > 30 ? '🟡 Gemiddelde ontspanning' : 
                 '🔴 Mogelijk nog gespannen'}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.footer}></div>
    </div>
  );
};

export default Statistics1;
