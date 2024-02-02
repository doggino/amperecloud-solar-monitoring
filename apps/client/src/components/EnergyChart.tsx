import React, { useMemo } from 'react';
import { MyFacility } from '../utils';
import { LineChart } from '@mui/x-charts';
import { getChartProps } from './ActivePowerChart';

interface EnergyChartProps {
  facilities: MyFacility[];
}
const EnergyChart: React.FC<EnergyChartProps> = ({ facilities }) => {
  const chartProps = useMemo(() => getChartProps(facilities, 'energy', 70), [
    facilities,
  ]);

  return <LineChart {...chartProps} height={400} />;
};

export default EnergyChart;
