  "use client";

  import React, { useEffect, useState } from "react";
  import CalendarHeatmap from "react-calendar-heatmap";
  import "react-calendar-heatmap/dist/styles.css";
  import { endOfToday, subMonths, startOfWeek, endOfWeek } from "date-fns";
  import { Tooltip } from "react-tooltip";

  interface HeatmapValue {
    date: string;
    count?: number;
  }


  const getClassForValue = (value: HeatmapValue | undefined): string => {
    if (!value || !value.count) return "color-empty";
    if (value.count >= 4) return "color-github-4";
    if (value.count === 3) return "color-github-3";
    if (value.count === 2) return "color-github-2";
    return "color-github-1";
  };

  const getTooltipDataAttrs = (value: HeatmapValue | undefined): { [key: string]: string } => {
    return value?.date
      ? {
          "data-tooltip-id": "heatmap-tooltip",
          "data-tooltip-content": `${value.date}: ${value.count ?? 0} daily`,
        }
      : {};
  };
  

  export default function UserDashboard() {
    const [activity, setActivity] = useState<HeatmapValue[]>([]);

    
    const fetchActivity = async (): Promise <void> => {
      const res = await fetch("/api/user/daily-activity", {
        cache: "no-store",
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setActivity(data);
    };

    useEffect(() => {
      fetchActivity();

      const handler = () => fetchActivity();
      window.addEventListener("daily-updated", handler);
  
      return () => window.removeEventListener("daily-updated", handler);
    }, []);

    const startDate = startOfWeek(subMonths(endOfToday(), 11), { weekStartsOn: 0 }); 
    const endDate = endOfWeek(endOfToday(), { weekStartsOn: 0 }); 
    

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Aktivitas Harian</h1>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={activity}
          classForValue={getClassForValue}
          tooltipDataAttrs={getTooltipDataAttrs}
          showWeekdayLabels
        />
        <Tooltip id="heatmap-tooltip" />
      </div>
    );
  }
