import { CommonParams } from '@/Theme/theme';
import { StyleSheet } from 'react-native';

export default function <C>({
  Layout,
}: CommonParams<C>) {
  return StyleSheet.create({
    blurView: {
      ...Layout.fill,
    },
  });
}
