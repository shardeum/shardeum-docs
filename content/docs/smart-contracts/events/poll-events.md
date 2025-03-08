---
title: Polling Cycles
description: Learn about Shardeum's polling cycles
---

## What are smart contract events?

Smart contract events broadcast new data coming from a contract.

## Why are smart contract events important?

Smart contract event listening notifies applications and users in real-time that something new has happened in a smart contract.

## Where are events used in smart contract applications?

## Frontend

If you swap tokens on a website using an AMM DEX smart contract, the token balances will know when to be updated on the frontend almost instantly using events.

## Backend

Trading bots can listen to AMM DEX swap contracts events and find potential arbitrage opportunities.
IoT robotics applications in the physical world connected to a smart contract can be controlled with events.
Chainlink oracle nodes also depend on smart contract events to know when to communicate between the real world and blockchains.

## How to listen to smart contract events on Shardeum?

## Websockets

Shardeum supports standard EVM-specific Websockets features. Websockets details can be found [here](https://docs.shardeum.org/docs/
network/endpoints).

## Polling

Reading smart contract events can also be done using Shardeum cycles (we listen to blocks/bundles to do this).

## Reading events with Shardeum Cycles:

1. To get the current cycle: get the latest block, then divide by 10, and round down.

2. Build the JSON URL with:

Example with:

```
startCycle = endCycle = 49
address = 0x23FF65f07cAbAd1643440a0114d71260F2Bb6352
```

https://explorer-sphinx.shardeum.org/api/transaction?startCycle=19020&endCycle=19045&address=0x245E2395712F888CeD1033C924115105dC32e388

3. Filter for transactions per page [note, 10 transactions per page]:

https://explorer-sphinx.shardeum.org/api/transaction?startCycle=19020&endCycle=19045&address=0x245E2395712F888CeD1033C924115105dC32e388&page=1

## JSON URL Filter Variables

```
?startCycle=latestCycle
&endCycle=latestCycle
&address=addressToListenTo
&page=1
```

## Event Listening With Polling Examples:

Reading transaction events from the null address (address(0)) from cycle 0 to 1000:


```js
const axios = require('axios');

let baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=19020&endCycle=19045&address=0x245E2395712F888CeD1033C924115105dC32e388"

getTransactionsToAddressCycleRange(baseUrl)

async function readJSONLoop(totalTransactions) {

	let total = totalTransactions;
	let pageIndex = 1

	while ( total > 0 ) {

		let filterUrl = baseUrl + "&page=" + pageIndex
		console.log(filterUrl)

		let responseRawJSON = await axios.get(filterUrl);
		responseRawJSON = responseRawJSON.data;
		console.log(responseRawJSON);

	  	total -= 10;
		pageIndex++;
	}

}

async function getTransactionsToAddressCycleRange(baseUrl) {

	let responseRawJSON = await axios.get(baseUrl);
	let responseDataJSON = responseRawJSON.data;
	let totalTransactions = responseDataJSON.totalTransactions
	console.log(totalTransactions);

	readJSONLoop(totalTransactions)
    
}
```

```python
import requests
import json

transactionsInCycleRangeUrlString = "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=19020&endCycle=19045&address=0x245E2395712F888CeD1033C924115105dC32e388"

response = requests.get(transactionsInCycleRangeUrlString)
transactionsInCycleRangeUrlJSON = response.json()
totalTransactions = transactionsInCycleRangeUrlJSON["totalTransactions"]
print(totalTransactions)
pageIndex = 1

while totalTransactions > 0:
    print(pageIndex)
    print(totalTransactions)
    
    pageIndexIncrementUrlString = transactionsInCycleRangeUrlString + "&page=" + str(pageIndex)
    response = requests.get(pageIndexIncrementUrlString)
    rawTransactionDataPage = response.json()
    
    # Pretty print the JSON data
    print(json.dumps(rawTransactionDataPage, indent=4))
    
    totalTransactions -= 10
    pageIndex += 1
```

```go
package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
   "strconv"
)

func main() {
   
   baseUrl := "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=";
   transactionCount := getTransactionCount(6928, baseUrl)
   log.Println(transactionCount)

   readJsonLoop(transactionCount, baseUrl)

}

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func getTransactionCount(cycleNumber int, baseUrl string) (x int) {

   getRequestUrl := 
      baseUrl +
      strconv.Itoa(cycleNumber)+
      "&endCycle="+
      strconv.Itoa(cycleNumber);
   log.Println(getRequestUrl)

   resp, err := http.Get(getRequestUrl)
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   return transactionCountJsonInstance.TotalTransactions;
}

func readJsonLoop(totalTransactions int, baseUrl string) {

   total := totalTransactions;
   pageIndex := 1;

   for total > 0 {

      getRequestUrl := 
         baseUrl+
         strconv.Itoa(6928)+
         "&endCycle="+
         strconv.Itoa(6928)+
         "&page=" + 
         strconv.Itoa(pageIndex)
      log.Println(getRequestUrl)

      resp, err := http.Get(getRequestUrl)
      if err != nil {
         log.Fatalln(err)
      }
   
      rawBodyBytes, err := ioutil.ReadAll(resp.Body)
      if err != nil {
         log.Fatalln(err)
      }
   
      log.Printf(string(rawBodyBytes))

      total -= 10;
      pageIndex++;
   }

}
```

```rust
use serde_json;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {

    let base_url = String::from("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=");
    let cycle_number = 6928;

    let transaction_count : u64 = get_transaction_count(cycle_number.clone(), base_url.clone()).await;    
    println!("transaction_count: {:#?}", transaction_count);
     
    read_json_loop(cycle_number.clone(), base_url.clone(), transaction_count).await;

    Ok(())
}

async fn get_transaction_count(cycle_number: u64, base_url: String) -> u64   {

    let get_request_url = 
        base_url +
        &cycle_number.to_string() +
        "&endCycle=" +
        &cycle_number.to_string();
    println!("getRequestUrl: {:#?}", get_request_url);

    let new_todo: serde_json::Value = reqwest::Client::new()
        .get(get_request_url)
        .send()
        .await.unwrap()
        .json()
        .await.unwrap();

    println!("JSON raw response: {:#?}", new_todo);
    println!("{:#?}", new_todo["success"]);
    println!("{:#?}", new_todo["totalTransactions"]);
    println!("{:#?}", new_todo["totalTransactions"].as_u64().unwrap());

    return new_todo["totalTransactions"].as_u64().unwrap();

}

async fn read_json_loop(cycle_number: u64, base_url: String, total_transactions: u64) {

   let mut total : i64 = total_transactions as i64; //Convert value to be signed so we do not have an underflow error when the value become negative.
   let mut page_index = 1;

   while total > 0 {

        let get_request_url = 
            base_url.clone() +
            &cycle_number.to_string() +
            "&endCycle=" +
            &cycle_number.to_string() +
            "&page=" + 
            &page_index.to_string();
        println!("getRequestUrl: {:#?}", get_request_url);

        let new_todo: serde_json::Value = reqwest::Client::new()
            .get(get_request_url)
            .send()
            .await.unwrap()
            .json()
            .await.unwrap();
    
        println!("JSON raw response: {:#?}", new_todo);

        total -= 10;
        page_index += 1;
    }   
    
}
```


Listening for the latest cycle, which might contain transaction events from an address:

```js
const axios = require('axios');
const ethers = require('ethers')

const rpcURL = "https://sphinx.shardeum.org"

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

const timeMilliSec = 1000;

listenForCycle()

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function listenForCycle() {
  while (true){

    console.log("Current cycle (1 cycle = 10 blocks [bundles]) ")
    let cycle = await provider.getBlockNumber();
    console.log(Math.floor(cycle/10))

    let baseUrlCycleAddress = "https://sphinx.shardeum.org.shardeum.org/api/transaction?startCycle=" + cycle + "&endCycle=" + cycle + "&address=0x0000000000000000000000000000000000000000" 
    console.log(baseUrlCycleAddress)

    let responseRawJSON = await axios.get(baseUrlCycleAddress);
    let responseDataJSON = responseRawJSON.data;
    let totalTransactions = responseDataJSON.totalTransactions
    console.log(totalTransactions);

    readJSONLoopLatestCycle(totalTransactions,baseUrlCycleAddress)

    await timeout(60*timeMilliSec)

  }
}

async function readJSONLoopLatestCycle(totalTransactions,baseUrl) {

	let total = totalTransactions;
	let pageIndex = 1

	while ( total > 0 ) {

		let filterUrl = baseUrl + "&page=" + pageIndex
		console.log(filterUrl)

		let responseRawJSON = await axios.get(filterUrl);
		responseRawJSON = responseRawJSON.data;
		console.log(responseRawJSON);

    total -= 10;
		pageIndex++;
	}

}
```

```python
from web3 import Web3
import time
import math
import requests  # use requests instead of urllib for simplicity

ShardeumConnectionHTTPS = "https://sphinx.shardeum.org";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

print("Connected to Web3? ", web3.isConnected())
print("Chain ID? ", web3.eth.chain_id)

addressToSubscribeTo = "0x1dacbab28decd115c8aa6f183877c71b942ae406"

while True:
    print("Current cycle (1 cycle = 10 blocks [bundles]) ")
    cycle =  (math.floor(web3.eth.blockNumber/10))  #Divide current bundle [block] by 10, then round down to get cycle.
    print(cycle)

    transactionsInCycleRangeUrlString = "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=" + str(cycle) + "&endCycle=" + str(cycle) + "&address=" + addressToSubscribeTo 
    print(transactionsInCycleRangeUrlString)

    response = requests.get(transactionsInCycleRangeUrlString)
    transactionsInCycleRangeUrlJSON = response.json()
    totalTransactions = transactionsInCycleRangeUrlJSON["totalTransactions"]
    print(totalTransactions)
    
    pageIndex = 1

    while totalTransactions > 0:
        print(pageIndex)
        print(totalTransactions)
        
        pageIndexIncrementUrlString = transactionsInCycleRangeUrlString + "&page=" + str(pageIndex)
        response = requests.get(pageIndexIncrementUrlString)
        rawTransactionDataPage = response.json()
        
        # Pretty print the JSON data
        print(json.dumps(rawTransactionDataPage, indent=4))
        
        totalTransactions -= 10
        pageIndex += 1

    time.sleep(60)   
```


```go
package main

import (
   "io/ioutil"
   "log"
   "net/http"
   "encoding/json"
   "context"
   "math/big"
   "strconv"
   "time"

   "github.com/ethereum/go-ethereum/ethclient"
)

func main() {

   client, chainID := clientSetup("https://sphinx.shardeum.org/")

   log.Println("chainID: ", chainID)


   for {

      header, err := client.HeaderByNumber(context.Background(), nil)
      if err != nil {
         log.Fatal(err)
      }

      blockNumber := header.Number
      bigNumberTenBundlesPerCycle, _ := new(big.Int).SetString("10", 10)  //Value 10, decimal units also 10. 
      cycleNumber := new(big.Int).Div(blockNumber, bigNumberTenBundlesPerCycle)
      bigNumberOne, _ := new(big.Int).SetString("1", 10)  //Value 1, decimal units 10. 
      cycleNumberMinusOne := new(big.Int).Sub(cycleNumber, bigNumberOne)
      log.Println(cycleNumberMinusOne)
      
      baseUrl := "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=";
      transactionCount := getTransactionCount(cycleNumberMinusOne, baseUrl)
      log.Println(transactionCount)

      readJsonLoop(cycleNumberMinusOne,baseUrl,transactionCount)

      time.Sleep(60 * time.Second)

   }

}

type transactionCountJson struct {
	Success bool `json:"success"`
   TotalTransactions int `json:"totalTransactions"`
}

func getTransactionCount(cycleNumber *big.Int, baseUrl string) (x int) {

   getRequestUrl := 
      baseUrl +
      cycleNumber.String()+
      "&endCycle="+
      cycleNumber.String();
   log.Println(getRequestUrl)

   resp, err := http.Get(getRequestUrl)
   if err != nil {
      log.Fatalln(err)
   }

   rawBodyBytes, err := ioutil.ReadAll(resp.Body)
   if err != nil {
      log.Fatalln(err)
   }

   var transactionCountJsonInstance transactionCountJson

   err = json.Unmarshal(rawBodyBytes, &transactionCountJsonInstance)
   if err != nil {
      log.Fatalln(err)
   }

   return transactionCountJsonInstance.TotalTransactions;
}

func readJsonLoop(cycleNumber *big.Int, baseUrl string, totalTransactions int) {

   total := totalTransactions;
   pageIndex := 1;

   for total > 0 {

      getRequestUrl := 
         baseUrl+
         cycleNumber.String()+
         "&endCycle="+
         cycleNumber.String()+
         "&page=" + 
         strconv.Itoa(pageIndex)
      log.Println(getRequestUrl)

      resp, err := http.Get(getRequestUrl)
      if err != nil {
         log.Fatalln(err)
      }
   
      rawBodyBytes, err := ioutil.ReadAll(resp.Body)
      if err != nil {
         log.Fatalln(err)
      }
   
      log.Printf(string(rawBodyBytes))

      total -= 10;
      pageIndex++;
   }

}

func clientSetup(wssConnectionURL string) (client *ethclient.Client, chainID *big.Int) {

   client, err := ethclient.Dial(wssConnectionURL) //Also works with HTTPS connections. 
   if err != nil {
       log.Fatal(err)
   }
 
   chainID, err = client.NetworkID(context.Background())
   if err != nil {
      log.Fatal(err)
   }
   return
}
```

```rust
use serde_json;
use ethers_providers::{Middleware, Provider, Http};
use std::thread::{sleep};
use std::time::{Duration};

#[tokio::main]
async fn main() {

    let rpc_shardeum_https = "https://sphinx.shardeum.org/";

    let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let chainid = provider.get_chainid().await.unwrap();
    println!("Got chainid: {}", chainid);

    loop{

        let current_block_number = provider.get_block_number().await.unwrap();
        println!("current_block_number: {:?}", current_block_number);

        let current_cycle_number = current_block_number/10;
        println!("current_cycle_number: {:?}", current_cycle_number);

        let current_cycle_number_minus_one = current_cycle_number-1;
        println!("current_cycle_number: {:?}", current_cycle_number_minus_one);

        let base_url = String::from("https://explorer-sphinx.shardeum.org/api/transaction?startCycle=");

        let transaction_count : u64 = get_transaction_count(current_cycle_number_minus_one.as_u64().clone(), base_url.clone()).await;    
        println!("transaction_count: {:#?}", transaction_count);
        
        read_json_loop(current_cycle_number_minus_one.as_u64().clone(), base_url.clone(), transaction_count).await;

        sleep(Duration::from_millis(60000)); // Sleep for 60 seconds.

    }

}

async fn get_transaction_count(cycle_number: u64, base_url: String) -> u64   {

    let get_request_url = 
        base_url +
        &cycle_number.to_string() +
        "&endCycle=" +
        &cycle_number.to_string();
    println!("getRequestUrl: {:#?}", get_request_url);

    let new_todo: serde_json::Value = reqwest::Client::new()
        .get(get_request_url)
        .send()
        .await.unwrap()
        .json()
        .await.unwrap();

    println!("JSON raw response: {:#?}", new_todo);
    println!("{:#?}", new_todo["success"]);
    println!("{:#?}", new_todo["totalTransactions"]);
    println!("{:#?}", new_todo["totalTransactions"].as_u64().unwrap());

    return new_todo["totalTransactions"].as_u64().unwrap();

}

async fn read_json_loop(cycle_number: u64, base_url: String, total_transactions: u64) {

   let mut total : i64 = total_transactions as i64; //Convert value to be signed so we do not have an underflow error when the value become negative.
   let mut page_index = 1;

   while total > 0 {

        let get_request_url = 
            base_url.clone() +
            &cycle_number.to_string() +
            "&endCycle=" +
            &cycle_number.to_string() +
            "&page=" + 
            &page_index.to_string();
        println!("getRequestUrl: {:#?}", get_request_url);

        let new_todo: serde_json::Value = reqwest::Client::new()
            .get(get_request_url)
            .send()
            .await.unwrap()
            .json()
            .await.unwrap();
    
        println!("JSON raw response: {:#?}", new_todo);

        total -= 10;
        page_index += 1;
    }   
    
}
```

