import * as React from 'react';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

const data = [
  { region: 'Asia', val: 4119626293 },
  { region: 'Africa', val: 1012956064 },
  { region: 'Northern America', val: 344124520 },
  { region: 'Latin America and the Caribbean', val: 590946440 },
  { region: 'Europe', val: 727082222 },
  { region: 'Oceania', val: 35104756 },
];

export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <>
        <Chart
          data={chartData}
          height={400}
          width={1000}
        >
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
            outerRadius={.2}
          />
          <Legend />
          <Title
            text="The Population of Continents and Regions"
          />
          <Animation />
          <EventTracker />
          <Tooltip />
        </Chart>
      </>
    );
  }
}