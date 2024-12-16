import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTheme } from "@/Hooks";

interface HeaderProps {
  title: string; // Title to be displayed in the center
  onLeftPress?: (event: GestureResponderEvent) => void; // Callback for left icon press
  leftIcon?: React.ReactNode; // Custom left icon (e.g., back arrow)
  onRightPress?: (event: GestureResponderEvent) => void; // Callback for right icon/action press
  rightIcon?: React.ReactNode; // Custom right icon or action
  style?: object; // Additional styles for the header container
  titleStyle?: object; // Additional styles for the title text
}

const Header: React.FC<HeaderProps> = ({
  title,
  onLeftPress,
  leftIcon,
  onRightPress,
  rightIcon,
  style,
  titleStyle,
}) => {
  const navigation = useNavigation();
  const theme = useTheme()
  return (
    <View style={[styles.container, style]}>
      {/* Left Icon or Button */}
      <TouchableOpacity
        style={styles.left}
        onPress={onLeftPress || (() => navigation.goBack())}
      >
        {leftIcon ||         <Icon
          name={'chevron-left'}
          size={theme.MetricsSizes.large}
          style={{height:  theme.MetricsSizes.large, width: theme.MetricsSizes.large, flexShrink: 0 }}
          onPress={onLeftPress}
          testID="iconChevronLeft"
        />}
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Right Icon or Button */}
      <TouchableOpacity style={styles.right} onPress={onRightPress}>
        {rightIcon || null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'transparent'
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    flex: 3,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  defaultIcon: {
    fontSize: 18,
    color: "#000",
  },
});

export default Header;
