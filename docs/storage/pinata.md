---
title: Pinata
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Pinata?


Pinata is a web3 media management platform that helps creators and developers share content via IPFS (InterPlanetary File System) with ease! In addition to simplified file storage, Pinata offers tools to deliver content quickly and create token gated experiences, such as  [Dedicated Gateways](https://www.pinata.cloud/dedicated-gateways?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum)  and [ Submarine.me](http://submarine.me/?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum).

## How to upload to IPFS with Pinata


There are two main ways you can upload files to IPFS with Pinata: the Pinata web app, and the Pinata API.

### Pinata Web App


To get started you will want to visit the Pinata website and  [sign up for a free account](https://www.pinata.cloud/pricing?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum), which will give you up to 1GB storage and 100 files!

After you have signed up you can start uploading! Simply press the "Upload" button and select "file":

<img src="https://gateway.pinata.cloud/ipfs/QmNWiQyceu4eTQ9NJK7QEGtuYwPZw6UNcuR32x78UoqvpM/1.jpg" alt="step 1" />

Once you have selected the file on your computer, you can give it a name and click "Upload":

<img src="https://gateway.pinata.cloud/ipfs/QmNWiQyceu4eTQ9NJK7QEGtuYwPZw6UNcuR32x78UoqvpM/3.jpg" alt="step 2" />

As soon as the file has completed uploading, you should see it listed in your file manager with the name (that you can click on to preview a file) as well as the CID for that file.

<img src="https://gateway.pinata.cloud/ipfs/QmNWiQyceu4eTQ9NJK7QEGtuYwPZw6UNcuR32x78UoqvpM/4.jpg" alt="step 3" />

### Pinata API


If you are building a platform or application and prefer to upload through an API, Pinata has you covered! Be sure to check out the documentation link below, as well as the link to our SDK:

 [Pinata Docs](https://docs.pinata.cloud/?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum)

 [Pinata SDK](https://www.npmjs.com/package/@pinata/sdk)

Here is a quick node.js code snippet showing how you would do a simple file upload to Pinata:


<Tabs>
  <TabItem value="javascript" label="Javascript" default>

```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/Users/Desktop/images/cat.JPG'));
data.append('pinataOptions', '{"cidVersion": 1}');
data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');
var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  headers: {
    'Authorization': 'Bearer PINATA JWT',
    …data.getHeaders()
  },
  data : data
};
const res = await axios(config);
console.log(res.data);
```

  </TabItem>
</Tabs>

## How to view and retrieve content from IPFS with Pinata


There are several different ways you can view your content and reference it in a smart contract, including a Protocol URI, Public Gateway, and Dedicated Gateway.

### Protocol URI


A standard IPFS URL looks like this:

    ipfs://QmRAuxeMnsjPsbwW8LkKtk6Nh6MoqTvyKwP3zwuwJnB2yP

If you copy and paste that into your browser, you may not get anything back. That is because in order to use this one, you need to have a local IPFS node running to participate in the network. Even when you do, it will likely be very very slow since IPFS is still a growing network.

So, why use a Protocol URI? Well for a couple of reasons. If you are building on a blockchain that already uses IPFS a lot, like Ethereum or another L2 chain, lots of marketplaces and apps are used to seeing this format. When they see it, they use tools to convert the URL into a gateway URL so it can display the content on a website. This can be a good thing or a bad thing. If the platform has a dedicated/private gateway, the speed will be very fast (much like our own dedicated gateways). However, if the platform uses a public gateway, the speeds will be very slow.

In the end, the platform has control over how well your content is received. Additionally, using the standard IPFS URL might help future proof your assets, as public gateways might be stopped down the road (however the CID is still in the URL in those cases, so if the platform knows what to do, they can still get the content if pinned).

### Public Gateway


A public gateway URL looks something like this:

    https://gateway.pinata.cloud/ipfs/QmRAuxeMnsjPsbwW8LkKtk6Nh6MoqTvyKwP3zwuwJnB2yP

This will deliver the content in the browser without the need of a local IPFS node. However, since this gateway is a public gateway, your speed might vary due to the heavy traffic and congestion. Some platforms will see this kind of the URL and switch it out with their own faster gateway choice, but not always. Generally you want to assume that if you take this path, the assets will be slow.

### Dedicated Gateway


A dedicated gateway URL looks something like this:

    https://pinnieblog.mypinata.cloud/ipfs/QmRAuxeMnsjPsbwW8LkKtk6Nh6MoqTvyKwP3zwuwJnB2yP

Dedicated Gateways are much much faster than any other method, and should ideally be used when trying to display content on your own platform. However, using them in an NFT project should be done in caution. If you use a Dedicated Gateway in your NFT project metadata and image links, your speed will be great, however anytime another marketplace or rarity bot asks the blockchain for the IPFS data, your gateway will be hit. Since most Dedicated Gateways are paid services, this could greatly drive up your costs and usage. You’ll get the best performance, control, and flexibility with this method, however you might have to pay more than the other methods.

## Going Further with Pinata


If you want to go to the next level, consider upgrading to the [Picnic plan](https://pinata.cloud/pricing)! Not only does this plan give you a Dedicated Gateway, it also gives you access to [Submarine.me](https://submarine.me); a new tool that helps creators make token gated content! You can upload content that is only unlockable by NFT, retweeting, geolocation, and soon debit and credit card payments. Take a look at the demo below!

<iframe width="560" height="315" src="https://www.youtube.com/embed/YhT4Xqn1tYI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Connect with us!


Still thirsty for answers? We got them! Check out all the ways you can reach us:

* Visit us at [pinata.cloud](https://pinata.cloud/?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum)
* Read our [Docs](https://docs.pinata.cloud/?utm_source=dev-docs&utm_medium=dev-docs&utm_campaign=&utm_content=shardeum)
* Check out [Submarine.me](https://submarine.me)
* Follow us on [Twitter](https://twitter.com/pinatacloud)
* Join our [Discord](https://discord.gg/pinata)
* Email us at team@pinata.cloud
