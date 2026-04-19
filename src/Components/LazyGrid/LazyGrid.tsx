import React from "react";
import { FlatList, View, StyleSheet, Dimensions, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type RenderItemParams = {
    item: any
    index: number
}
interface LazyGridProps<T> {
  data: T[]; // Generic type for the data array
  renderItem: ({item,index}: RenderItemParams)=>any; // Render function for each item
  numColumns?: number; // Optional number of columns, defaults to 2
  keyExtractor: (item: T, index: number) => string; // Function to extract keys for items
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined
  onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
}

const LazyGrid = <T extends unknown>({
  data,
  renderItem,
  numColumns = 2,
  keyExtractor,
  ListFooterComponent,
  onScroll
}: LazyGridProps<T>) => {
  const ITEM_WIDTH = (SCREEN_WIDTH / numColumns) - 10;

  const renderGridItem: ListRenderItem<T> = ({ item, index }) => {
    return (
      <View style={[styles.gridItem, { width: ITEM_WIDTH }]}>
        {renderItem({ item, index })}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderGridItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={ListFooterComponent}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default LazyGrid;
