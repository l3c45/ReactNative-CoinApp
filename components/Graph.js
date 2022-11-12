import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

const Graph = ({ data,coin}) => {
  const offset = Math.round(data.prices.length / 4);
  
  return (
    <View>
      <Text style={styles.header}>{coin.name} prices one month ago ({coin.symbol.toUpperCase()}/USD)</Text>
      <LineChart
        data={{
          labels: data.prices
            .map((item) => item[0])
            .filter((item, index) => index % offset === 0)
            .map((item) => new Date(item).toLocaleDateString("en-GB")),
          datasets: [
            {
              data: data.prices.map((item) => item[1]),
            },
          ],
        }}
        width={Dimensions.get("window").width - 5} // from react-native
        height={300}
        segments={6}
        onDataPointClick={({ value,dataset }) => {
          console.log(value,dataset);
          
      }}
      fromZero={true}
        withVerticalLines={false}
        withHorizontalLines={false}
        chartConfig={{
          strokeWidth: 1,
          fillShadowGradientFromOpacity: 0.5,
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2, 
          color: (opacity = 255) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForVerticalLabels: {
            fontSize: 12,
          },
          propsForDots:{
            r:2
          }
        }}
        withDots={true}
        
        // bezier
        yAxisInterval={1}
        verticalLabelRotation={40}
        style={{
          borderRadius: 16,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
    color: "#fff",
  },
});
