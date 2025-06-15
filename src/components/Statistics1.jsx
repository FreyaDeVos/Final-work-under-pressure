import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics1 = ({ maxRMSSD, avgRMSSD, setCurrentPage }) => {
  const [showTooltipAvg, setShowTooltipAvg] = useState(false);
  const [showTooltipMin, setShowTooltipMin] = useState(false);  

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={8} currentPage={3} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <main className={styles.mainContent}>
           
        <h1>STRESSLEVEL IN RUST</h1>
 <StressLegend />
        <div className={styles.chartGrid}>
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip} style={{ position: 'relative' }}>
                <p className={styles.chartLabel}>
                  mijn stresslevel in rust
                  <span
                    className={styles.tooltipIcon}
                    onClick={() => setShowTooltipMin(!showTooltipMin)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShowTooltipMin(!showTooltipMin);
                      }
                    }}
                    aria-label="Meer info over jouw rustwaarde"
                  >
                    i
                    {showTooltipMin && (
                      <div className={styles.tooltipText}>
                        <button
                          className={styles.tooltipClose}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltipMin(false);
                          }}
                          aria-label="Sluit tooltip"
                        >
                          &times;
                        </button>
                       Dit is jouw stresslevel gemeten in rust. 
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              {maxRMSSD !== null ? (
                <P5Chart maxRMSSD={maxRMSSD} />
              ) : (
                <div className={styles.chartFallback}>Geen rustwaarde beschikbaar</div>
              )}
            </div>
          </div>

          {/* Gemiddelde rustwaarde */}
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip} style={{ position: 'relative' }}>
                <p className={styles.chartLabel}>
                  gemiddelde stresslevel in rust
                  <span
                    className={styles.tooltipIcon}
                    onClick={() => setShowTooltipAvg(!showTooltipAvg)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShowTooltipAvg(!showTooltipAvg);
                      }
                    }}
                    aria-label="Meer info over gemiddelde waarde"
                  >
                    i
                    {showTooltipAvg && (
                      <div className={styles.tooltipText}>
                        <button
                          className={styles.tooltipClose}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltipAvg(false);
                          }}
                          aria-label="Sluit tooltip"
                        >
                          &times;
                        </button>
                        Dit is het gemiddelde stresslevel in rust wereldwijd.
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <P5Chart maxRMSSD={avgRMSSD} />
            </div>
          </div>

        </div>

        <button className={styles.nextButton} onClick={() => setCurrentPage(4)}>
          VOLGENDE
        </button>
      </main>
    </div>
  );
};

export default Statistics1;
