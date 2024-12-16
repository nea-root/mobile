import { mockSlideList, SlideList } from '@/../__mocks__/SlideList/mockSlideList';
import { UserFlowTypes } from '@/Navigators/utils';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  Image,
} from 'react-native';
import { ImageSource } from 'react-native-vector-icons/Icon';

export type WalkthroughCarouselProps = {
  flowType : String
}

const screenWidth = Dimensions.get('window').width;


const WalkthroughCarousel = ({flowType}: WalkthroughCarouselProps) => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const setFlowSlideData = () =>{
    return mockSlideList.filter((val,index)=>val.flowType === flowType)
  }

  // Memoize slidesData since it's static
  const slidesData = useMemo(
    () => setFlowSlideData(),
    [flowType]
  );

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Memoize onScroll to prevent unnecessary re-creations
  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ind = event.nativeEvent.contentOffset.x / screenWidth;
    const roundIndex = Math.round(ind);
    setActiveIndex(roundIndex);
  }, []);

  // Memoize the renderItem function
  const renderItem = useCallback(
    ({ item }: { item: SlideList}) => (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode={'contain'}/>
      </View>
    ),
    []
  );

//   // Carousel auto-scroll logic
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (!loading) {
//       interval = setInterval(() => {
//         flatListRef.current?.scrollToIndex({
//           animated: true,
//           index: (activeIndex + 1) % slidesData.length,
//         });
//         setActiveIndex((prev) => (prev + 1) % slidesData.length);
//       }, 3000);
//     }

//     return () => {
//       if (interval) clearInterval(interval); // Cleanup on unmount
//     };
//   }, [loading, activeIndex, slidesData.length]);

  return (
    <View style={styles.container}>
      <FlatList
        data={slidesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={onScroll}
        initialNumToRender={1}
        scrollEventThrottle={16} // Optimize scroll handling
      />
      <View style={styles.dotsContainer}>
        {slidesData.length > 1? slidesData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        )): <></>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: "white",
      paddingTop: 40,
      paddingHorizontal: 17,
    },
    slide: {
      width: screenWidth - 2 * 17, // Padding accounted for
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      aspectRatio: 16 / 9, // Adjust this ratio based on your images
      resizeMode: "contain", // Ensures the image fits within the box
    },
    dotsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      alignSelf: "center",
      marginTop: 16,
      height: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: "#4AC16A",
    },
    inactiveDot: {
      backgroundColor: "#CECED0",
    },
  });
  

export default WalkthroughCarousel;
