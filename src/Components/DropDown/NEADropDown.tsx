import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface DropdownProps {
  label?: string;
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
  style?: object;
  required?: boolean;
}

const NEADropdown: React.FC<DropdownProps> = ({
  label,
  options,
  placeholder = 'Select an option',
  onSelect,
  style = {},
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);


  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setShowOptions(false);
    onSelect(value);
  };
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={{
            position: 'absolute',
            left: 10,
            top: 2,
            fontSize: 10,
            color: '#434345',
          }}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Animated.Text>
      )}
      <TouchableOpacity
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        onPress={() => {
          setShowOptions(!showOptions);
        }}
      >
        <Text style={selectedOption ? styles.selectedText : styles.placeholder}>
          {selectedOption || placeholder}
        </Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#ffffff'
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    justifyContent: 'center',
    color: '#000',
  },
  inputFocused: {
    borderColor: '#4AC16A',
  },
  placeholder: {
    color: '#aaa',
    fontSize: 16,
  },
  selectedText: {
    color: '#000',
    fontSize: 16,
  },
  required: {
    color: 'red',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    maxHeight: 150,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default NEADropdown;
