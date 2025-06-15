import React, { useState } from 'react';
import PageIndicators from './PageIndicators';
import ExitButton from './ExitButton';
import styles from './LayoutGrid.module.css';
import P5Chart from './P5Chart';
import StressLegend from './StressLegend';

const Statistics2 = ({ minRMSSD, maxRMSSD, avgRMSSD, setCurrentPage }) => {
  const [showTooltipMin, setShowTooltipMin] = useState(true);
  const [showTooltipMax, setShowTooltipMax] = useState(false);
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

        <div className={styles.stat2ChartGrid}>

          {/* Persoonlijke waarde na drukte */}
          <div className={styles.stat2ChartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  mijn stresslevel in drukte
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
                    aria-label="Meer info over persoonlijke waarde na drukte"
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
                         Dit is jouw stresslevel gemeten in drukte.
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

          <div className={styles.stat2ChartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  mijn stresslevel in rust
                  <span
                    className={styles.tooltipIcon}
                    onClick={() => setShowTooltipMax(!showTooltipMax)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShowTooltipMax(!showTooltipMax);
                      }
                    }}
                    aria-label="Meer info over persoonlijke waarde in rust"
                  >
                    i
                    {showTooltipMax && (
                      <div className={styles.tooltipText}>
                        <button
                          className={styles.tooltipClose}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTooltipMax(false);
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

          {/* Gemiddelde waarde wereldwijd in drukte */}
          <div className={styles.stat2ChartRow}>
            <div className={styles.labelContainer}>
              <div className={styles.labelWithTooltip}>
                <p className={styles.chartLabel}>
                  gemiddelde stresslevel in drukte
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
                    aria-label="Meer info over gemiddelde waarde wereldwijd"
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
                        Dit is het gemiddelde stresslevel wereldwijd in drukke situaties.
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

        <button className={styles.nextButton} onClick={() => setCurrentPage(7)}>
          VOLGENDE
        </button>
      </main>
    </div>
  );
};

export default Statistics2;
