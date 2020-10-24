import React from 'react';
import styled from 'styled-components/native';
import { Svg } from 'react-native-svg';

import { VictoryPie, VictoryLabel } from './Victory';

const VisualisationContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

function Visualisation({ data, navigation, selectedIndex }) {
  const { totalSdgCount, userSdgCount, totalColors, userColors } = data;
  return (
    <VisualisationContainer>
      <Svg width={350} height={350}>
        <VictoryPie
          standalone={false}
          data={selectedIndex === 0 ? userSdgCount : totalSdgCount}
          width={350}
          height={350}
          padAngle={2}
          innerRadius={90}
          labels={({ datum }) => '#' + datum.x + ': ' + datum.y}
          style={{
            labels: {
              fill: 'black',
              fontSize: 12,
              padding: 12,
            },
          }}
          colorScale={selectedIndex === 0 ? userColors : totalColors}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: (event, pressedProps) => {
                  navigation.navigate('SDG', { sdgNo: pressedProps.datum.x });
                },
                onClick: (event, pressedProps) => {
                  navigation.navigate('SDG', { sdgNo: pressedProps.datum.x });
                },
                onMouseOver: () => {
                  return [
                    {
                      target: 'data',
                      mutation: () => ({ style: { fill: '#DC2D28', fillOpacity: 0.9, stroke: '#FEEC04' } }),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: 'data',
                      mutation: () => {},
                    },
                  ];
                },
              },
            },
          ]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 24, fontWeight: 'bold', fill: 'black' }}
          x={175}
          y={175}
          text={selectedIndex === 0 ? ['Your SDG', 'Impact'] : ["SA4SI", "Community", 'Impact']}
        />
      </Svg>
    </VisualisationContainer>
  );
}

export default Visualisation;
