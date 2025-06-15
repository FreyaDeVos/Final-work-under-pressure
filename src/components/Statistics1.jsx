import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics1 = ({ maxRMSSD, setCurrentPage }) => {
  const averageRMSSD = 24; // hardcoded average in rest

  const [showTooltipIk, setShowTooltipIk] = useState(true);
  const [showTooltipAvg, setShowTooltipAvg] = useState(false);

  // maxRMSSD is personal max RMSSD value (highest measured)
  // if null, show fallback

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

          {/* Personal highest RMSSD ("ik") */}
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  ik
                  <span
                    className={styles.tooltipIcon}
                    onClick={() => setShowTooltipIk(!showTooltipIk)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShowTooltipIk(!showTooltipIk);
                      }
                    }}
                    aria-label="Meer info over jouw waarde"
                  >
                    i
                    {showTooltipIk && (
                      <div className={styles.tooltipText}>
                        <button
                          className={styles.tooltipClose}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltipIk(false);
                          }}
                          aria-label="Sluit tooltip"
                        >
                          &times;
                        </button>
                        Deze waarde is jouw gemeten stresslevel in rust.
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
                <div className={styles.chartFallback}>Geen stresslevel beschikbaar</div>
              )}
            </div>
          </div>

          {/* Hardcoded average RMSSD = 24 */}
          <div className={styles.chartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  gemiddelde in rust
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
                        Dit stresslevel is het gemiddelde van mensen, wereldwijd in rust.
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <P5Chart maxRMSSD={averageRMSSD} />
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
