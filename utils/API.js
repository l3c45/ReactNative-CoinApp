export const APIRequest = async() => {
const response= await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
const data=await response.json()
return data
}

export const APICoin = async (coin) =>  {
    const response =await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=30&interval=daily`)
    const data= await response.json()
    return data
}