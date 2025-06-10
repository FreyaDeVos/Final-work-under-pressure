import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import statsStyles from './Statistics.module.css';

const Statistics2 = ({ hrvData, onNextPage }) => {
  const p5ContainerRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoTimer, setVideoTimer] = useState(0);
  const [collectedHRV, setCollectedHRV] = useState([]);
  const [lowestHRV, setLowestHRV] = useState(Infinity);

  useEffect(() => {
    let timer;
    if (isVideoPlaying && videoTimer < 40) {
      timer = setInterval(() => {
        setVideoTimer(prev => prev + 1);
      }, 1000);
    } else if (videoTimer >= 40) {
      setIsVideoPlaying(false);
      // Na 40 seconden automatisch naar volgende pagina (Ending)
      setTimeout(() => {
        onNextPage?.();
      }, 3000);
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
          const minHRV = Math.min(...newData);
          setLowestHRV(minHRV);
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
        p.text('Laagste HRV - Stress Reactie', p.width / 2, 30);
        
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
        
        // Laagste HRV waarde
        if (lowestHRV !== Infinity) {
          p.textAlign(p.RIGHT);
          p.fill(150, 0, 0);
          p.text(`Laagste HRV: ${lowestHRV} ms`, p.width - 20, 30);
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
          
          // Kleur bepalen (lager = roder = meer stress)
          const normalizedValue = value / maxValue;
          p.fill(255, normalizedValue * 255, normalizedValue * 255);
          
          // Highlight laagste waarde
          if (value === lowestHRV) {
            p.fill(255, 0, 0); // Rood voor laagste
            p.strokeWeight(3);
          } else {
            p.strokeWeight(1);
          }
          
          p.stroke(0);
          p.rect(x, y, barWidth - 2, barHeight);
          
          // Waarde boven staaf
          p.fill(0);
          p.textAlign(p.CENTER);
          p.textSize(12);
          p.text(Math.round(value), x + barWidth / 2, y - 5);
          
          p.strokeWeight(1); // Reset stroke
        });
        
        // As-labels
        p.fill(0);
        p.textAlign(p.CENTER);
        p.textSize(14);
        p.text('HRV Metingen tijdens Stress (RMSSD in ms)', p.width / 2, p.height - 10);
        
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
        
        // Stress level indicator
        if (lowestHRV !== Infinity) {
          const stressLevel = getStressLevel(lowestHRV);
          p.fill(stressLevel.color);
          p.textAlign(p.CENTER);
          p.textSize(16);
          p.text(`Stress reactie: ${stressLevel.text}`, p.width / 2, p.height - 40);
        }
      };
    };

    if (p5ContainerRef.current) {
      const p5Instance = new p5(sketch, p5ContainerRef.current);
      return () => p5Instance.remove();
    }
  }, [collectedHRV, videoTimer, lowestHRV]);

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

  const getStressLevel = (hrv) => {
    if (hrv < 20) return { text: 'Hoge stress reactie', color: [255, 0, 0] };
    if (hrv < 35) return { text: 'Matige stress reactie', color: [255, 165, 0] };
    if (hrv < 50) return { text: 'Lichte stress reactie', color: [255, 255, 0] };
    return { text: 'Goede stress weerstand', color: [0, 255, 0] };
  };

  const startMeasurement = () => {
    setIsVideoPlaying(true);
    setVideoTimer(0);
    setCollectedHRV([]);
    setLowestHRV(Infinity);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={7} currentPage={6} onPageChange={() => {}} />
        <ExitButton onClick={() => alert('Exit!')} />
      </div>
      
      <div className={styles.mainContent}>
        <div className={statsStyles.statisticsContainer}>
          <h2 className={statsStyles.title}>Statistieken 2: Stress Reactie</h2>
          <p className={statsStyles.subtitle}>Analyse van je laagste HRV tijdens stress</p>
          
          {!isVideoPlaying && videoTimer === 0 && (
            <div className={statsStyles.controlSection}>
              <p className={statsStyles.subtitle}>Druk op start om je stress-reactie te analyseren</p>
              <button onClick={startMeasurement} className={`${statsStyles.startButton} ${statsStyles.stressStartButton}`}>
                ⚡ Start Stress Analyse
              </button>
            </div>
          )}
          
          {isVideoPlaying && (
            <div className={statsStyles.videoSection}>
              <div className={statsStyles.statusIndicator + ' ' + statsStyles.measuring}>
                📈 Stress reactie meting...
              </div>
              <div className={`${statsStyles.videoPlaceholder} ${statsStyles.stressVideoPlaceholder}`}>
                ⚡ Stress Test Video - {40 - videoTimer}s resterend
              </div>
              <div className={statsStyles.timer}>{40 - videoTimer}s</div>
            </div>
          )}
          
          <div ref={p5ContainerRef} className={statsStyles.chartContainer} />
          
          {videoTimer >= 40 && (
            <div className={statsStyles.resultsSection}>
              <div className={statsStyles.statusIndicator + ' ' + statsStyles.completed}>
                ✅ Stress analyse voltooid!
              </div>
              <div className={`${statsStyles.resultValue} ${statsStyles.lowestHRV}`}>
                Laagste HRV: {lowestHRV === Infinity ? 'Geen data' : `${lowestHRV} ms`}
              </div>
              {lowestHRV !== Infinity && (
                <div className={
                  lowestHRV < 20 ? `${statsStyles.resultMessage} ${statsStyles.concernResult}` :
                  lowestHRV < 35 ? `${statsStyles.resultMessage} ${statsStyles.goodResult}` :
                  `${statsStyles.resultMessage} ${statsStyles.excellentResult}`
                }>
                  {lowestHRV < 20 ? '🔴 Sterke stress reactie - Focus op ontspanning' : 
                   lowestHRV < 35 ? '🟡 Normale stress reactie' : 
                   '🟢 Uitstekende stress weerstand!'}
                </div>
              )}
              
              <div className={statsStyles.hrvInfo}>
                <div className={statsStyles.hrvStat}>
                  <div className={statsStyles.hrvStatLabel}>Metingen verzameld</div>
                  <div className={statsStyles.hrvStatValue}>{collectedHRV.length}</div>
                </div>
                <div className={statsStyles.hrvStat}>
                  <div className={statsStyles.hrvStatLabel}>Gemiddelde HRV</div>
                  <div className={statsStyles.hrvStatValue}>
                    {collectedHRV.length > 0 ? Math.round(collectedHRV.reduce((a, b) => a + b, 0) / collectedHRV.length) : 0} ms
                  </div>
                </div>
              </div>
              
              <p className={statsStyles.subtitle}>Doorgang naar eindresultaten over 3 seconden...</p>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.footer}></div>
    </div>
  );
};

export default Statistics2;