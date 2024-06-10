import { Component } from 'react';
import { TextProperties, ColorValue } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

declare module 'react-native-vector-icons/MaterialIcons' {


  export default class MaterialIcons extends Component<IconProps> {}
}

declare module 'react-native-vector-icons/Icon' {
  export interface IconProps extends TextProperties {
    name: string;
    size?: number;
    color?: number | ColorValue;
  }

}
