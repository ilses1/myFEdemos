I will implement the event markers on the K-chart corresponding to the `messageList` data.

**Plan:**

1.  **Prepare Data**: In `src/pages/Chart/kChart/index.tsx`, inside the chart rendering `useEffect`, I will iterate through `response.messageList`.
2.  **Match Dates**: For each message, I will find the corresponding K-line data (using `messageDate`) to determine the Y-axis coordinate (using the `highValue` of that day so the marker appears above the candle).
3.  **Configure `markPoint`**: I will add a `markPoint` configuration to the candlestick series (`series[0]`).
    - **Symbol**: Use an invisible symbol (`symbolSize: 0`) to act as an anchor.
    - **Label**: Configure the label to look like the white box in your screenshot (white background, border, shadow, padding).
    - **Position**: Place the label at the 'top' of the anchor point.
4.  **Update Chart**: The chart option will be updated to include these markers.

**Implementation Details:**

- Access `response.messageList` from the imported `const.ts`.
- Map each message to a data item: `{ name: msg.messageTitle, coord: [msg.messageDate, matchedHighValue], value: msg.messageTitle }`.
- Apply styling: `backgroundColor: '#fff'`, `shadowBlur`, `borderRadius`, etc.
