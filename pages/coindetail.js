import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  Share,
} from "react-native";
import Graph from "../components/Graph";
import { APICoin } from "../utils/API";
import { Button } from "@rneui/themed";
import * as WebBrowser from "expo-web-browser";
import { useNavigation, useTheme } from "@react-navigation/native";


const Coindetail = ({ route }) => {

  const coin = route.params.coin;

  const { colors } = useTheme();

  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState(null);
  const [data, setData] = useState();

  const getData = async (coin) => {
    const dataApi = await APICoin(coin);
    setData(dataApi);
  };

  useEffect(() => {
    getData(coin);
  }, []);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      `https://www.coingecko.com/es/monedas/${coin.name.toLowerCase()}`
    );
    setResult(result);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.coingecko.com/es/monedas/${coin.name.toLowerCase()}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={[styles.container,{backgroundColor:colors.background}]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <View style={styles.top}>
          <Text style={[styles.text, styles.title,{color:colors.text}]}>{coin.name}</Text>
          <Image style={styles.img} source={{ uri: coin.image }}></Image>
        </View>
        <View style={styles.middle}>
          <Text style={[styles.text, styles.subtitle, styles.left,{color:colors.text}]}>
            Price:
          </Text>
          <Text style={[styles.text, styles.subtitle, styles.right,{color:colors.text}]}>
            {coin.current_price} USD
          </Text>

          <Text style={[styles.text, styles.subtitle, styles.left,{color:colors.text}]}>
            Variation:
          </Text>
          <Text
            style={[
              styles.subtitle,
              styles.right,
              coin.price_change_percentage_24h > 0 ? styles.green : styles.red,
            ]}
          >
            {coin.price_change_percentage_24h}%
          </Text>

          <Text style={[styles.text, styles.subtitle, styles.left,{color:colors.text}]}>
            Last update:
          </Text>
          <Text style={[styles.text, styles.subtitle, styles.right,{color:colors.text}]}>
            {new Date(coin.last_updated).toLocaleString()}
          </Text>
        </View>
        <View style={[styles.box,{backgroundColor:colors.card}]}>
          <Text style={[styles.text, styles.textBottom, styles.left,{color:colors.text}]}>
            High last 24hs:
          </Text>
          <Text style={[styles.text, styles.textBottom, styles.right,{color:colors.text}]}>
            {coin.high_24h}USD
          </Text>

          <Text style={[styles.text, styles.textBottom, styles.left,{color:colors.text}]}>
            Low last 24hs:
          </Text>
          <Text style={[styles.text, styles.textBottom, styles.right,{color:colors.text}]}>
            {coin.low_24h}USD
          </Text>
          <Text style={[styles.text, styles.textBottom, styles.left,{color:colors.text}]}>
            Circulating Supply:
          </Text>
          <Text style={[styles.text, styles.textBottom, styles.right,{color:colors.text}]}>
            {coin.circulating_supply}
          </Text>

          <Text style={[styles.text, styles.textBottom, styles.left,{color:colors.text}]}>
            Total Supply:
          </Text>
          <Text style={[styles.text, styles.textBottom, styles.right,{color:colors.text}]}>
            {coin.total_supply}
          </Text>
        </View>
        {data ? (
          <Graph dataApi={data} coin={coin}></Graph>
        ) : (
          <Button
            buttonStyle={{ marginTop: 50, marginBottom: 50 }}
            title="Solid"
            type="clear"
            loading
          />
        )}
      </View>
      <Button
        buttonStyle={{ marginTop: 0, marginBottom: 20 }}
        title="More info..."
        onPress={_handlePressButtonAsync}
      />
      <Button
        color="warning"
        buttonStyle={{ marginTop: 0, marginBottom: 20 }}
        title="Share"
        onPress={onShare}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    
  },
  loading: {
    height: 200,
    width: 200,
  },
  text: {
    color: "#fff",
  },
  title: {
    fontSize: 50,
  },
  img: {
    marginRight: 10,
    width: 50,
    height: 50,
  },
  subtitle: {
    fontSize: 18,
  },
  box: {
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  middle: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",

    padding: 5,
  },
  textBottom: {
    fontSize: 18,
  },
  right: {
    width: "60%",
    textAlign: "right",
  },
  left: {
    width: "40%",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
});
export default Coindetail;
