import React, { useMemo } from 'react';
import { MyFacility } from '../utils';
import { CurveType, LineChart, ScaleName } from '@mui/x-charts';
import { FacilityData } from 'apps/__generated__/graphql';

interface ActivePowerChartProps {
  facilities: MyFacility[];
}

export const getChartProps = (
  facilities: MyFacility[],
  property: Exclude<keyof FacilityData, '__typename' | 'time'>,
  limit?: number
) => {
  const timeMap: {
    [key: string]: {
      [key: string]: number;
    };
  } = {};
  const series: {
    [key: string]: {
      id: string;
      label: string;
      showMark: boolean;
      curve: CurveType;
      data?: (number | null)[];
    };
  } = {};

  facilities.forEach((facility) => {
    if (!facility.uploadCSV) return;

    series[facility.id] = {
      id: facility.id,
      label: facility.name,
      showMark: limit ? limit < 80 : false,
      curve: 'linear',
    };

    facility.uploadCSV.data.forEach((item) => {
      if (timeMap[item.time]) {
        timeMap[item.time][facility.id] = item[property];
      } else {
        timeMap[item.time] = { [facility.id]: item[property] };
      }
    });
  });

  const times = Object.keys(timeMap).sort(
    (a, b) => Number(new Date(a)) - Number(new Date(b))
  );

  const segmentLength = limit ? Math.floor(times.length / (limit + 1)) + 1 : 1;
  let tempCounter = 0;

  const xAxisData: Date[] = [];
  let tempData: {
    [key: string]: number;
  } = {};

  times.forEach((time, index) => {
    tempCounter += 1;

    const shouldSumUp =
      tempCounter === segmentLength || index === times.length - 1;

    Object.keys(series).forEach((id) => {
      if (timeMap[time][id])
        tempData[id] = (tempData[id] || 0) + Number(timeMap[time][id]);

      if (shouldSumUp) {
        const value = tempData[id] ? tempData[id] / tempCounter : null;

        if (!series[id].data) {
          series[id].data = [value];
        } else {
          series[id].data?.push(value);
        }
      }
    });

    if (shouldSumUp) {
      xAxisData.push(new Date(time));
      tempCounter = 0;
      tempData = {};
    }
  });

  return {
    xAxis: [
      {
        id: 'Time',
        data: xAxisData,
        scaleType: 'time' as ScaleName,
        valueFormatter: (date: Date) => date.toLocaleTimeString(),
      },
    ],
    series: Object.keys(series).map((id) => series[id]),
  };
};

const ActivePowerChart: React.FC<ActivePowerChartProps> = ({ facilities }) => {
  const chartProps = useMemo(
    () => getChartProps(facilities, 'activePower', 70),
    [facilities]
  );

  return <LineChart {...chartProps} height={400} />;
};

export default ActivePowerChart;
