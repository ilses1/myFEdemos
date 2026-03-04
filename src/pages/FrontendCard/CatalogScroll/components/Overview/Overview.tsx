import React from 'react';
import type { LeafProps } from '../types';
import styles from './index.less';

const Overview: React.FC<LeafProps> = ({ title }) => {
  const timeRanges = [
    '成立以来',
    '今年以来',
    '近一月',
    '近三月',
    '近半年',
    '近一年',
    '近三年',
  ];

  const baseInfoRows = [
    { label: '指数名称', value: '中证REITs全收益' },
    { label: '英文名称', value: 'CSI REITs Total Return Index' },
    { label: '指数代码', value: '932047' },
    { label: '基日', value: '2021-09-30' },
    { label: '基点', value: '1000' },
    { label: '发布日期', value: '2022-12-15' },
    { label: '发布机构', value: '中证指数有限公司' },
    { label: '加权方式', value: '市值加权｜调整市值加权' },
    { label: '收益处理方式', value: '全收益指数' },
    { label: '产品跟踪数量', value: '0' },
    { label: '成分数量', value: '47' },
    { label: '指数编制方式', value: '中证REITs全收益指数编制方法' },
    { label: '关联指数', value: '中证REITs(收益)' },
  ];

  const pieLegend = [
    { color: 'rgba(59, 122, 255, 1)', label: '特许经营权', value: '18.00%' },
    { color: 'rgba(255, 99, 71, 1)', label: '产改', value: '56.22%' },
    { color: 'rgba(255, 181, 71, 1)', label: '仓储物流', value: '14.27%' },
    {
      color: 'rgba(52, 199, 123, 1)',
      label: '保障性租赁住房',
      value: '14.27%',
    },
    { color: 'rgba(161, 107, 255, 1)', label: '交通基础设施', value: '14.27%' },
  ];

  const bars = [
    { label: '前五权重', percent: 80 },
    { label: '前十权重', percent: 60 },
    { label: '前二十权重', percent: 36 },
    { label: '前四十权重', percent: 20 },
  ];

  return (
    <div className={styles.overview}>
      <div className={styles.left}>
        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.titleDot} />
              <span className={styles.cardTitle}>市场表现</span>
              <span className={styles.cardMeta}>2025/01/01~2025/12/05</span>
            </div>
            <button className={styles.headerAction} type="button">
              <span className={styles.headerActionIcon} aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path
                    d="M8 1.2a.8.8 0 0 1 .8.8v6.08l2.18-2.18a.8.8 0 1 1 1.14 1.12L8.57 10.6a.8.8 0 0 1-1.14 0L3.88 7.02A.8.8 0 0 1 5.02 5.9L7.2 8.08V2a.8.8 0 0 1 .8-.8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2.2 12.2c0-.44.36-.8.8-.8h10c.44 0 .8.36.8.8v1c0 .44-.36.8-.8.8H3a.8.8 0 0 1-.8-.8v-1Z"
                    fill="currentColor"
                    opacity="0.55"
                  />
                </svg>
              </span>
              下载
            </button>
          </header>

          <div className={styles.marketToolbar}>
            <div
              className={styles.radioGroup}
              role="tablist"
              aria-label="时间区间"
            >
              {timeRanges.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={[
                    styles.radioItem,
                    t === '今年以来' ? styles.radioItemActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="tab"
                  aria-selected={t === '今年以来'}
                >
                  <span className={styles.radioDot} aria-hidden="true" />
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.toolbarRight}>
              <div className={styles.select}>
                <span className={styles.selectLabel}>右轴</span>
                <span className={styles.selectValue}>波动率</span>
                <span className={styles.selectCaret} aria-hidden="true" />
              </div>
              <div className={styles.select}>
                <span className={styles.selectValue}>深标3月</span>
                <span className={styles.selectCaret} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={styles.marketChart}>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span
                  className={[styles.legendLine, styles.legendBlue]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                />
                <span className={styles.legendText}>中证REITs全收益</span>
              </span>
              <span className={styles.legendItem}>
                <span
                  className={[styles.legendLine, styles.legendRed]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden="true"
                />
                <span className={styles.legendText}>波动率(右)</span>
              </span>
            </div>

            <div className={styles.chartCanvas} aria-hidden="true">
              <svg
                className={styles.chartSvg}
                viewBox="0 0 760 312"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="overview_grid"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#f7fbff" />
                    <stop offset="1" stopColor="#ffffff" />
                  </linearGradient>
                  <linearGradient
                    id="overview_blue_fill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#3b7aff" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#3b7aff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="overview_red_fill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#ff5a5a" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#ff5a5a" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="760"
                  height="312"
                  fill="url(#overview_grid)"
                />

                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={i}
                    x1="56"
                    x2="742"
                    y1={36 + i * 44}
                    y2={36 + i * 44}
                    stroke="#edf2ff"
                    strokeWidth="1"
                  />
                ))}

                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={i}
                    x1={56 + i * 76.5}
                    x2={56 + i * 76.5}
                    y1="18"
                    y2="286"
                    stroke="#f1f5ff"
                    strokeWidth="1"
                  />
                ))}

                <path
                  d="M56 250 C 120 190, 164 80, 228 108 C 290 138, 332 150, 398 142 C 470 132, 510 120, 574 142 C 628 160, 672 164, 742 138 L 742 286 L 56 286 Z"
                  fill="url(#overview_blue_fill)"
                />
                <path
                  d="M56 232 C 110 248, 170 260, 228 240 C 296 216, 350 206, 404 214 C 470 224, 520 224, 574 202 C 630 174, 684 186, 742 160 L 742 286 L 56 286 Z"
                  fill="url(#overview_red_fill)"
                />

                <path
                  d="M56 250 C 120 190, 164 80, 228 108 C 290 138, 332 150, 398 142 C 470 132, 510 120, 574 142 C 628 160, 672 164, 742 138"
                  fill="none"
                  stroke="#3b7aff"
                  strokeWidth="2.4"
                />
                <path
                  d="M56 232 C 110 248, 170 260, 228 240 C 296 216, 350 206, 404 214 C 470 224, 520 224, 574 202 C 630 174, 684 186, 742 160"
                  fill="none"
                  stroke="#ff5a5a"
                  strokeWidth="2.2"
                />

                <circle cx="398" cy="142" r="4.5" fill="#3b7aff" />
                <circle cx="574" cy="202" r="4.2" fill="#ff5a5a" />

                <g opacity="0.75">
                  <text x="10" y="46" fontSize="12" fill="#7a889e">
                    18.00%
                  </text>
                  <text x="10" y="90" fontSize="12" fill="#7a889e">
                    15.00%
                  </text>
                  <text x="10" y="134" fontSize="12" fill="#7a889e">
                    12.00%
                  </text>
                  <text x="10" y="178" fontSize="12" fill="#7a889e">
                    9.00%
                  </text>
                  <text x="10" y="222" fontSize="12" fill="#7a889e">
                    6.00%
                  </text>
                  <text x="10" y="266" fontSize="12" fill="#7a889e">
                    3.00%
                  </text>
                </g>

                <g opacity="0.78">
                  <text x="700" y="46" fontSize="12" fill="#7a889e">
                    11.00%
                  </text>
                  <text x="700" y="90" fontSize="12" fill="#7a889e">
                    10.00%
                  </text>
                  <text x="700" y="134" fontSize="12" fill="#7a889e">
                    9.00%
                  </text>
                  <text x="700" y="178" fontSize="12" fill="#7a889e">
                    8.00%
                  </text>
                  <text x="700" y="222" fontSize="12" fill="#7a889e">
                    7.00%
                  </text>
                  <text x="700" y="266" fontSize="12" fill="#7a889e">
                    6.00%
                  </text>
                </g>
              </svg>

              <div className={styles.chartTooltip}>
                <div className={styles.tooltipDate}>2010-08-22</div>
                <div className={styles.tooltipRow}>
                  <span className={styles.tooltipName}>中证REITs全收益</span>
                  <span className={styles.tooltipValue}>-2.04%</span>
                </div>
                <div className={styles.tooltipRow}>
                  <span className={styles.tooltipName}>波动率(右)</span>
                  <span className={styles.tooltipValue}>0.09%</span>
                </div>
              </div>

              <div className={styles.chartBrush}>
                <div className={styles.brushMini}>
                  <div className={styles.brushFill} />
                </div>
                <div className={styles.brushHandles} aria-hidden="true">
                  <span className={styles.brushHandle} />
                  <span className={styles.brushHandle} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.bottom}>
          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <span className={styles.titleDot} />
                <span className={styles.cardTitle}>指数分布</span>
              </div>
              <div className={styles.headerRightGroup}>
                <div className={styles.inlineField}>
                  <span className={styles.fieldLabel}>选择日期</span>
                  <div className={styles.fieldValue}>2025-12-05</div>
                  <span className={styles.selectCaret} aria-hidden="true" />
                </div>
                <button className={styles.headerAction} type="button">
                  <span className={styles.headerActionIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path
                        d="M8 1.2a.8.8 0 0 1 .8.8v6.08l2.18-2.18a.8.8 0 1 1 1.14 1.12L8.57 10.6a.8.8 0 0 1-1.14 0L3.88 7.02A.8.8 0 0 1 5.02 5.9L7.2 8.08V2a.8.8 0 0 1 .8-.8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2.2 12.2c0-.44.36-.8.8-.8h10c.44 0 .8.36.8.8v1c0 .44-.36.8-.8.8H3a.8.8 0 0 1-.8-.8v-1Z"
                        fill="currentColor"
                        opacity="0.55"
                      />
                    </svg>
                  </span>
                  下载
                </button>
              </div>
            </header>

            <div className={styles.pieBody}>
              <div className={styles.pieChart} aria-hidden="true">
                <svg viewBox="0 0 120 120" className={styles.pieSvg}>
                  <circle
                    cx="60"
                    cy="60"
                    r="42"
                    fill="none"
                    stroke="#eaf0ff"
                    strokeWidth="18"
                  />
                  <g transform="rotate(-90 60 60)">
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="rgba(255, 99, 71, 1)"
                      strokeWidth="18"
                      strokeDasharray="148 116"
                      strokeLinecap="butt"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="rgba(59, 122, 255, 1)"
                      strokeWidth="18"
                      strokeDasharray="48 216"
                      strokeDashoffset="-148"
                      strokeLinecap="butt"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="rgba(255, 181, 71, 1)"
                      strokeWidth="18"
                      strokeDasharray="38 226"
                      strokeDashoffset="-196"
                      strokeLinecap="butt"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="rgba(52, 199, 123, 1)"
                      strokeWidth="18"
                      strokeDasharray="38 226"
                      strokeDashoffset="-234"
                      strokeLinecap="butt"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="rgba(161, 107, 255, 1)"
                      strokeWidth="18"
                      strokeDasharray="38 226"
                      strokeDashoffset="-272"
                      strokeLinecap="butt"
                    />
                  </g>
                  <circle cx="60" cy="60" r="26" fill="#fff" />
                  <text
                    x="60"
                    y="56"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#7a889e"
                  >
                    总计
                  </text>
                  <text
                    x="60"
                    y="74"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#2b3340"
                  >
                    100%
                  </text>
                </svg>
              </div>

              <div className={styles.pieLegend}>
                {pieLegend.map((it) => (
                  <div key={it.label} className={styles.legendRow}>
                    <span
                      className={styles.legendSwatch}
                      style={{ background: it.color }}
                      aria-hidden="true"
                    />
                    <span className={styles.legendLabel}>{it.label}</span>
                    <span className={styles.legendValue}>{it.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <span className={styles.titleDot} />
                <span className={styles.cardTitle}>权重集中度</span>
              </div>
              <div className={styles.headerRightGroup}>
                <div className={styles.inlineField}>
                  <span className={styles.fieldLabel}>选择日期</span>
                  <div className={styles.fieldValue}>2025-12-05</div>
                  <span className={styles.selectCaret} aria-hidden="true" />
                </div>
                <button className={styles.headerAction} type="button">
                  <span className={styles.headerActionIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path
                        d="M8 1.2a.8.8 0 0 1 .8.8v6.08l2.18-2.18a.8.8 0 1 1 1.14 1.12L8.57 10.6a.8.8 0 0 1-1.14 0L3.88 7.02A.8.8 0 0 1 5.02 5.9L7.2 8.08V2a.8.8 0 0 1 .8-.8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2.2 12.2c0-.44.36-.8.8-.8h10c.44 0 .8.36.8.8v1c0 .44-.36.8-.8.8H3a.8.8 0 0 1-.8-.8v-1Z"
                        fill="currentColor"
                        opacity="0.55"
                      />
                    </svg>
                  </span>
                  下载
                </button>
              </div>
            </header>

            <div className={styles.barBody}>
              <div className={styles.barAxis} aria-hidden="true">
                <span>0%</span>
                <span>20%</span>
                <span>40%</span>
                <span>60%</span>
                <span>80%</span>
                <span>100%</span>
              </div>
              <div className={styles.barList}>
                {bars.map((b) => (
                  <div key={b.label} className={styles.barRow}>
                    <div className={styles.barLabel}>{b.label}</div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${b.percent}%` }}
                      />
                    </div>
                    <div className={styles.barValue}>{b.percent}%</div>
                  </div>
                ))}
              </div>

              <div className={styles.barNote}>
                <span className={styles.noteDot} aria-hidden="true" />
                <span className={styles.noteText}>成分券数量</span>
                <span className={styles.noteValue}>17</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className={styles.right}>
        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div className={styles.cardHeaderLeft}>
              <span className={styles.titleDot} />
              <span className={styles.cardTitle}>基本信息</span>
            </div>
          </header>

          <div className={styles.infoBody}>
            <div className={styles.infoTable}>
              {baseInfoRows.map((r, idx) => (
                <div
                  key={r.label}
                  className={[
                    styles.infoRow,
                    idx % 2 === 1 ? styles.infoRowAlt : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className={styles.infoLabel}>{r.label}</div>
                  <div className={styles.infoValue}>{r.value}</div>
                </div>
              ))}
            </div>

            <div className={styles.intro}>
              <div className={styles.introTitle}>指数简介</div>
              <div className={styles.introBody}>
                <div className={styles.introBg} aria-hidden="true" />
                <p className={styles.introText}>
                  中证REITs（收益）指数选取沪深市场中满足一定流动性条件和上市时
                  间要求的公开募集基础设施证券投资基金（REITs）作为样本，反映沪
                  深REITs市场的整体表现。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;
