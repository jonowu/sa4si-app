import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SdgIcon = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.72 23.664l-15.746 7.069a22.886 22.886 0 011.817 6.413l17.113-2.225a40.119 40.119 0 00-3.184-11.257z"
        fill={color ? color : '#C31F33'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M68.314 11.552L56.185 23.83a22.887 22.887 0 014.01 5.324l15.155-8.257a40.12 40.12 0 00-7.036-9.346z"
        fill={color ? color : '#279B48'}
        fillOpacity={0.999}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.1 3.294l-6.874 15.832c2.05.889 3.957 2.073 5.663 3.515L66.037 9.468a40.12 40.12 0 00-9.936-6.174z"
        fill={color ? color : '#D3A029'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.729.006l-.692 17.246c2.232.089 4.44.504 6.551 1.232l5.637-16.31A40.12 40.12 0 0041.729.006z"
        fill={color ? color : '#EB1C2D'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.14 2.131l5.584 16.331a22.885 22.885 0 016.554-1.217L38.642 0A40.12 40.12 0 0027.14 2.131z"
        fill={color ? color : '#183668'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.303 9.383L25.41 22.594a22.892 22.892 0 015.672-3.502L24.259 3.24a40.12 40.12 0 00-9.956 6.142z"
        fill={color ? color : '#02558B'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.953 20.783l15.13 8.306a22.884 22.884 0 014.023-5.314L12.018 11.458a40.121 40.121 0 00-7.065 9.325z"
        fill={color ? color : '#5DBB46'}
        fillOpacity={0.999}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.352 34.79l17.11 2.28a22.885 22.885 0 011.83-6.409l-15.72-7.118A40.119 40.119 0 00.352 34.79z"
        fill={color ? color : '#007DBC'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.122 49.513L17.9 45.46a22.886 22.886 0 01-.607-6.638l-17.23-.959a40.12 40.12 0 001.06 11.651z"
        fill={color ? color : '#48773E'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.159 62.964l14.18-9.84a22.887 22.887 0 01-2.964-5.971L1.96 52.483A40.12 40.12 0 007.16 62.964z"
        fill={color ? color : '#CF8D2A'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.646 73.326l9.668-14.298a22.886 22.886 0 01-4.92-4.497l-13.38 10.9a40.118 40.118 0 008.632 7.895z"
        fill={color ? color : '#F99D26'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.17 79.2l3.849-16.825a22.88 22.88 0 01-6.213-2.416l-8.539 14.997A40.12 40.12 0 0031.17 79.2z"
        fill={color ? color : '#E11484'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.9 79.793l-2.488-17.08c-2.21.322-4.456.32-6.665-.008l-2.545 17.068a40.12 40.12 0 0011.699.02z"
        fill={color ? color : '#F36D25'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.851 75.023l-8.49-15.027a22.89 22.89 0 01-6.218 2.4l3.792 16.835a40.124 40.124 0 0010.916-4.207z"
        fill={color ? color : '#8F1838'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.137 65.537L57.792 54.59a22.883 22.883 0 01-4.931 4.484l9.617 14.329a40.119 40.119 0 008.66-7.867z"
        fill={color ? color : '#FDB713'}
        fillOpacity={0.99}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.234 52.614l-16.398-5.386a22.888 22.888 0 01-2.978 5.963l14.144 9.887a40.12 40.12 0 005.232-10.464z"
        fill={color ? color : '#00AED9'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M80.184 38l-17.237.901a22.885 22.885 0 01-.623 6.637l16.76 4.11A40.121 40.121 0 0080.185 38z"
        fill={color ? color : '#EF402B'}
      />
    </Svg>
  );
};

export { SdgIcon };
