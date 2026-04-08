import React from 'react';
import styles from './index.less';

const FigJamBasics: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Connectors are perfect for linking together related stuff. These
          magical arrows will stay connected even when you move the objects
          around.
        </h1>

        <div className={styles.instructions}>
          <div className={styles.keyRow}>
            <div className={styles.key}>
              <span className={styles.keyIcon}>X</span>
            </div>
            <span className={styles.instructionText}>
              Press and drag to draw a connector
            </span>
          </div>

          <div className={styles.keyRow}>
            <div className={styles.key}>
              <span className={styles.keyText}>enter</span>
            </div>
            <span className={styles.instructionText}>
              Hit while a connector is selected to add text to it
            </span>
          </div>
        </div>

        <div className={styles.tryIt}>Try it out</div>

        <div className={styles.flowchart}>
          <div className={styles.boxYellow}>
            <span className={styles.boxText}>Has ice cream?</span>
          </div>

          <div className={styles.boxOrange}>
            <span className={styles.boxText}>Buy ice cream</span>
          </div>

          <div className={styles.boxGreen}>
            <span className={styles.boxText}>Ice cream party!</span>
          </div>

          <svg className={styles.connectorYes} viewBox="0 0 58 108" fill="none">
            <path
              d="M29 0V88C29 97.9411 37.0589 106 47 106"
              stroke="#CECCCC"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <svg className={styles.connectorNo} viewBox="0 0 57 108" fill="none">
            <path
              d="M28 0V88C28 97.9411 20.0589 106 11 106"
              stroke="#CECCCC"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.toolbar}>
        <svg viewBox="0 0 35 59" fill="none" className={styles.toolbarIcon}>
          <rect
            width="35"
            height="59"
            rx="8"
            fill="white"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="0.5"
          />
          <rect
            x="7"
            y="13"
            width="21"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="19"
            width="14"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="25"
            width="17"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="31"
            width="10"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="37"
            width="21"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="43"
            width="21"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
          <rect
            x="7"
            y="49"
            width="15"
            height="2"
            rx="1"
            fill="rgba(0,0,0,0.3)"
          />
        </svg>
      </div>
    </div>
  );
};

export default FigJamBasics;
