declare module 'react-calendar-heatmap' {
    import * as React from 'react';
  
    interface HeatmapValue {
      date: string;
      count?: number;
    }
  
    interface ReactCalendarHeatmapProps {
      values: HeatmapValue[];
      startDate?: Date | string;
      endDate?: Date | string;
      classForValue?: (value: HeatmapValue) => string;
      tooltipDataAttrs?: (value: HeatmapValue) => Record<string, string>;
      showWeekdayLabels?: boolean;
    }
  
    const ReactCalendarHeatmap: React.FC<ReactCalendarHeatmapProps>;
    export default ReactCalendarHeatmap;
  }
  