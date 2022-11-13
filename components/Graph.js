import React,{useState} from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { LineChart } from "react-native-chart-kit";



const Graph = ({ dataApi,coin}) => {
  const offset = Math.round(dataApi.prices.length / 4);

  const [tooltipPos,setTooltipPos] = useState(
    { x:0, y:0, date:null ,visible:false, value:0,index:null })
    



  return (
    <View>
      <Text style={styles.header}>{coin.name} prices one month ago ({coin.symbol.toUpperCase()}/USD)</Text>
      <LineChart
        data={{
          labels: dataApi.prices
            .map((item) => item[0])
            .filter((item, index) => index % offset === 0)
            .map((item) => new Date(item).toLocaleDateString("en-GB")),
          datasets: [
            {
              data: dataApi.prices.map((item) => item[1]),
            },
          ],
        }}
        width={Dimensions.get("window").width - 5} 
        height={300}
        segments={6}
        onDataPointClick={
          (data) => { 
            console.log(data.x)
             const timeStampDate=dataApi.prices.filter((item,i) => i===data.index)
             const selectedDate=  new Date(timeStampDate[0][0]).toLocaleDateString("en-GB")
            
             const isSamePoint = (tooltipPos.x === data.x 
                                 && tooltipPos.y ===  data.y)
           
             // if clicked on the same point again toggle visibility
             // else,render tooltip to new position and update its value
             isSamePoint ? setTooltipPos((previousState)=> {
                                return {
                                     ...previousState, 
                                     value: data.value,
                                     visible: !previousState.visible}
                                })
                          : 
                        setTooltipPos({x: data.x, date: selectedDate,
                           value: data.value, y: data.y,index:data.index,
                           visible: true
                        });
           }
        }
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
            r:3
          }

        }}
        withDots={true}
        decorator={() => {
          return tooltipPos.visible ? <View>
           <Svg>
              <Rect x={tooltipPos.x<300?tooltipPos.x-60:tooltipPos.x-100} y={tooltipPos.y +10} width="100"  
               height="60" fill="black" />
              <TextSVG
                 x={tooltipPos.x<300?tooltipPos.x-60:tooltipPos.x-90}
                 y={tooltipPos.y + 30}
                 fill="white"
                 fontSize="16"
                 fontWeight="bold"
                 textAnchor="start"
                 >
                 ${tooltipPos.value.toFixed(2)}
                   </TextSVG>
                   <TextSVG
                 x={tooltipPos.x<300?tooltipPos.x-60:tooltipPos.x-85}
                 y={tooltipPos.y + 60}
                 fill="white"
                 fontSize="16"
                 fontWeight="bold"
                 textAnchor="start"
                 >
                 {tooltipPos.date}
                   </TextSVG>
           </Svg>
       </View> : null
       }}
        // bezier
        yAxisInterval={1}
        verticalLabelRotation={40}
        style={{
          borderRadius: 16,
          marginVertical: 10,
         paddingBottom:50
          
         
        }}
        
        getDotColor={(dataPoint, dataPointIndex) => {
          if (dataPointIndex === tooltipPos.index) {
          return 'red';
          }
          return "transparent";
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
