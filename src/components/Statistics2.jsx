import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics2 = ({ minRMSSD, setCurrentPage }) => {
  const averageStressRMSSD = 22; 

  const [showTooltipMin, setShowTooltipMin] = useState(true);
  const [showTooltipAvg, setShowTooltipAvg] = useState(false);


  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <PageIndicators totalPages={8} currentPage={6} />
        <ExitButton onClick={() => setCurrentPage(0)} />
      </div>

      <main className={styles.mainContent}>
        <h1>STRESSLEVEL IN DRUKTE</h1>
        <StressLegend />

        <div className={styles.chartGrid}>

          {/* Personal lowest RMSSD ("ik") */}
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  ik
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
                    aria-label="Meer info over laagste waarde"
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
                        Deze waarde is jouw gemeten stresslevel in drukte.
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              {minRMSSD !== null ? (
                <P5Chart maxRMSSD={minRMSSD} />
              ) : (
                <div className={styles.chartFallback}>Geen stresslevel beschikbaar</div>
              )}
            </div>
          </div>

          {/* Hardcoded average stress RMSSD = 65 */}
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  gemiddelde waarde
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
                        Dit stresslevel is het gemiddelde van mensen, wereldwijd in drukte.
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <P5Chart maxRMSSD={averageStressRMSSD} />
            </div>
          </div>

        </div>

        <button className={styles.nextButton} onClick={() => setCurrentPage(7)}>
          VOLGENDE
        </button>
      </main>
    </div>
  );
};

export default Statistics2;
