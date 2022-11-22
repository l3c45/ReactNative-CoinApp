import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Button } from '@rneui/themed'
import { signOutUser } from '../firebase/Session'
import FavoriteItem from '../components/FavoriteItem'

const Profile = ({navigation}) => {

    const [notification, setNotification] = useState(null)

    const data=[
        {

            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            "current_price": 15803.35,
            "market_cap": 303312129659,
            "market_cap_rank": 1,
            "fully_diluted_valuation": 331510232143,
            "total_volume": 30938573317,
            "high_24h": 16299.24,
            "low_24h": 15649.4,
            "price_change_24h": -421.2361186901562,
            "price_change_percentage_24h": -2.59628,
            "market_cap_change_24h": -9672613811.437988,
            "market_cap_change_percentage_24h": -3.09044,
            "circulating_supply": 19213750.0,
            "total_supply": 21000000.0,
            "max_supply": 21000000.0,
            "ath": 69045,
            "ath_change_percentage": -77.12451,
            "ath_date": "2021-11-10T14:24:11.849Z",
            "atl": 67.81,
            "atl_change_percentage": 23192.37654,
            "atl_date": "2013-07-06T00:00:00.000Z",
            "roi": null,
            "last_updated": "2022-11-22T00:13:37.345Z"
        
        },
        {
        
            "id": "ethereum",
            "symbol": "eth",
            "name": "Ethereum",
            "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
            "current_price": 1108.68,
            "market_cap": 133626126079,
            "market_cap_rank": 2,
            "fully_diluted_valuation": 133626126079,
            "total_volume": 10436906919,
            "high_24h": 1144.41,
            "low_24h": 1083.05,
            "price_change_24h": -28.155116758177428,
            "price_change_percentage_24h": -2.47662,
            "market_cap_change_24h": -4338684633.447617,
            "market_cap_change_percentage_24h": -3.14478,
            "circulating_supply": 120515833.853133,
            "total_supply": 120515833.853133,
            "max_supply": null,
            "ath": 4878.26,
            "ath_change_percentage": -77.24983,
            "ath_date": "2021-11-10T14:24:19.604Z",
            "atl": 0.432979,
            "atl_change_percentage": 256220.23544,
            "atl_date": "2015-10-20T00:00:00.000Z",
            "roi": {
                "times": 92.81554675145088,
                "currency": "btc",
                "percentage": 9281.554675145087
            },
            "last_updated": "2022-11-22T00:13:42.675Z"
        
        },
        {
        
            "id": "tether",
            "symbol": "usdt",
            "name": "Tether",
            "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
            "current_price": 0.999004,
            "market_cap": 65553483748,
            "market_cap_rank": 3,
            "fully_diluted_valuation": 65932037699,
            "total_volume": 44786646501,
            "high_24h": 1.007,
            "low_24h": 0.995501,
            "price_change_24h": -0.004450018334347439,
            "price_change_percentage_24h": -0.44347,
            "market_cap_change_24h": -418920249.38560486,
            "market_cap_change_percentage_24h": -0.63499,
            "circulating_supply": 65506652113.5205,
            "total_supply": 65884935624.7406,
            "max_supply": null,
            "ath": 1.32,
            "ath_change_percentage": -24.34829,
            "ath_date": "2018-07-24T00:00:00.000Z",
            "atl": 0.572521,
            "atl_change_percentage": 74.831,
            "atl_date": "2015-03-02T00:00:00.000Z",
            "roi": null,
            "last_updated": "2022-11-22T00:10:23.894Z"
        
        },
        {
        
            "id": "usd-coin",
            "symbol": "usdc",
            "name": "USD Coin",
            "image": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
            "current_price": 1.0,
            "market_cap": 44110082426,
            "market_cap_rank": 4,
            "fully_diluted_valuation": 44100364430,
            "total_volume": 4994950441,
            "high_24h": 1.011,
            "low_24h": 0.995715,
            "price_change_24h": -0.003272223112746664,
            "price_change_percentage_24h": -0.32606,
            "market_cap_change_24h": -437812892.1283264,
            "market_cap_change_percentage_24h": -0.98279,
            "circulating_supply": 44041966089.9072,
            "total_supply": 44032263101.3271,
            "max_supply": null,
            "ath": 1.17,
            "ath_change_percentage": -14.58532,
            "ath_date": "2019-05-08T00:40:28.300Z",
            "atl": 0.891848,
            "atl_change_percentage": 12.31322,
            "atl_date": "2021-05-19T13:14:05.611Z",
            "roi": null,
            "last_updated": "2022-11-22T00:13:26.800Z"
        
        }
       
        
    ]

    const handleNotification = (coin) => {
        console.log(coin)
        setNotification(coin)
    }

    const handleRemove = (coin) => {
        console.log(coin)
    }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Perfil</Text>
    <Text style={styles.subtitle}>Favoritos</Text>
    <FlatList
    alwaysBounceVertical ={false}
    contentContainerStyle={styles.list}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => <FavoriteItem remove={handleRemove} notify={handleNotification} coin={item}   />}
    data={data}
    scrollEnabled={true}
    nestedScrollEnabled 
    ></FlatList>
           <Button onPress={()=>{signOutUser(),navigation.replace("Login")}} title="Cerrar session"></Button>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor: "#112A40",
    
    
},
title:{
    marginVertical:20,
    marginLeft:10,
    color:"#fff",
    fontSize:32,

},
subtitle:{
    marginLeft:10,
    color:"#fff",
    fontSize:20,
    marginBottom:10
},
list:{
    
    width: "100%",
   // height:"80%"
}
})