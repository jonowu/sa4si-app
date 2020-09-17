import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ButtonGroup } from 'react-native-elements';
import { VictoryPie, VictoryLabel } from './Victory';
import { Svg } from 'react-native-svg';

const VisualisationContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

function Visualisation({ data, navigation }) {
  const [userVisualisationView, setUserVisualisationView] = useState(0);
  const toggleSwitch = () => {
    setUserVisualisationView(userVisualisationView ? 0 : 1);
  };
  const { totalSdgCount, userSdgCount, totalColors, userColors } = data;
  if (userSdgCount.length > 0) {
    return (
      <VisualisationContainer>
        <Svg width={350} height={350}>
          <VictoryPie
            standalone={false}
            data={(userVisualisationView && totalSdgCount) || userSdgCount}
            width={350}
            height={350}
            padAngle={2}
            innerRadius={90}
            labels={({ datum }) => '#' + datum.x + ': ' + datum.y}
            style={{
              labels: {
                fill: 'black',
                fontSize: 12,
                padding: 7,
              },
            }}
            colorScale={(userVisualisationView && totalColors) || userColors}
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
            style={{ fontSize: 24, fontWeight: 'bold', fill: '#DC2D28' }}
            x={175}
            y={175}
            text={(userVisualisationView && ["Everyone's", 'SDG Impact']) || ['Your SDG', 'Impact']}
          />
        </Svg>
        <ButtonGroup
          onPress={toggleSwitch}
          buttons={['You', 'All']}
          selectedIndex={userVisualisationView}
          selectedButtonStyle={{ backgroundColor: '#DC2D28' }}
          containerStyle={{ width: '30%' }}
          textStyle={{ fontSize: 13 }}
        />
      </VisualisationContainer>
    );
  }
}

export default Visualisation;
