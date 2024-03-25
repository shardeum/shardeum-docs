---
title: Foundry
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Foundry is a fast testing and deployment tool for developing EVM smart contracts.
Tests are written in Solidity to keep the workflow consistent with smart contract development and testing before deployments.

Foundry is written in Rust:
https://github.com/foundry-rs/foundry

Paradigm supports Foundry:
https://www.paradigm.xyz/2021/12/introducing-the-foundry-ethereum-development-toolbox

## Installing Foundry

1. Install

with the Foundry toolchain installer:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
curl -L https://foundry.paradigm.xyz | bash
```

  </TabItem>
</Tabs>

2. Close your terminal.

3. Open a new terminal.

4. Install Foundry by running:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
foundryup
```

  </TabItem>
</Tabs>

If this installation method does not work,
or you would like to install Foundry a different way, see other installation methods in Foundry's README:

https://github.com/foundry-rs/foundry#installation


## Creating a Foundry Project

Here is a popular Foundry project to get started with:

https://github.com/paulrberg/foundry-template

This document will be using development and test contracts from:

https://github.com/MarcusWentz/foundry-testing

In the same directory where you installed Foundry run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
foundry test
```

  </TabItem>
</Tabs>

You should see all tests pass if you have installed and downloaded these example projects correctly.

## Develop Contract

Development contract for testing ```src/Contract.sol``` is called ```SimpleStorage``` for this example:

<Tabs>
  <TabItem value="solidiy" label="Solidity" default>

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

error sameStorageValue();
error notOwner();
error msgValueZero();

contract SimpleStorage {

    uint  public storedData;  //Do not set 0 manually it wastes gas!
    uint  public ownerUnixTimeContract;
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    event setOpenDataEvent(address indexed user, uint newValue); //Topics and other event arguments used for Foundry testing. Event arguments like this use gas in production so be careful.
    event setOwnerDataEvent(uint newOwnerUnixTime);
    event donateToOwnerEvent();

    function set(uint x) public {
        if(storedData == x) { revert sameStorageValue(); }        
        storedData = x;
        emit setOpenDataEvent(msg.sender, x); //Topic 1 (user) and other argument not indexed (newValue) for Foundry.
    }

    function setOwnerData() public {
        if(msg.sender != owner) { revert notOwner(); }        
        ownerUnixTimeContract = block.timestamp;
        emit setOwnerDataEvent(block.timestamp);
    }

    function donateToOwner() public payable {
        if(msg.value == 0) { revert msgValueZero(); }        
        payable(owner).transfer(address(this).balance);
        emit donateToOwnerEvent();
    }

}
```

  </TabItem>
</Tabs>

## Test contract

Here we have a test contract which will test ```SimpleStorage``` located in ```test/Contract.t.sol``` called ```TestContract```:

<Tabs>
  <TabItem value="solidiy" label="Solidity" default>

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "forge-std/Test.sol";

import "src/Contract.sol";

contract TestContract is Test {

    //Functions fallback and receive used when the test contract is sent msg.value to prevent the test from reverting.
    fallback() external payable {}     // Fallback function is called when msg.data is not empty
    receive() external payable {}      // Function to receive Ether. msg.data must be empty

    //Define events here from other contracts since Foundry has trouble importing events from other contracts still.
    event setOpenDataEvent(address indexed user, uint newValue);
    event setOwnerDataEvent(uint newOwnerUnixTime);
    event donateToOwnerEvent();

    SimpleStorage simpleStorageInstance;

    function setUp() public {
        simpleStorageInstance = new SimpleStorage();
    }

    function testInitialStorage() public {
        assertEq(simpleStorageInstance.storedData(),0);
        assertEq(simpleStorageInstance.ownerUnixTimeContract(),0);
        assertEq(simpleStorageInstance.owner(),address(this));
    }

    function testSetValidPath() public {
        assertEq(simpleStorageInstance.storedData(),0);
        vm.expectEmit(true,false,false,true); // Events have bool flags for indexed topic parameters in order (3 topics possible) along with arguments that might not be indexed (last flag). You can also check which address sent the event.
        emit setOpenDataEvent(address(this),1);
        simpleStorageInstance.set(1);
        assertEq(simpleStorageInstance.storedData(),1);
    }

    function testSetRevertPath() public {
        assertEq(simpleStorageInstance.storedData(),0);
        vm.expectRevert(sameStorageValue.selector);    //Revert if the new value matches the current storage value. Custom error from SimpleStorage.
        simpleStorageInstance.set(0);
        assertEq(simpleStorageInstance.storedData(),0);
    }

    function testSetOwnerDataValidPath() public {
        assertEq(address(this),simpleStorageInstance.owner());
        assertEq(simpleStorageInstance.ownerUnixTimeContract(),0);
        vm.expectEmit(false,false,false,true); // Events have bool flags for indexed topic parameters in order (3 topics possible) along with arguments that might not be indexed (last flag). You can also check which address sent the event.
        emit setOwnerDataEvent(10);
        vm.warp(10);   //Increase block.timestamp by 10 seconds.
        simpleStorageInstance.setOwnerData();
        assertEq(simpleStorageInstance.ownerUnixTimeContract(),10);
    }

    function testSetOwnerDataRevertPath() public {
        vm.startPrank(address(0)); //Change the address to not be the owner. The owner is address(this) in this context.
        assertEq(simpleStorageInstance.ownerUnixTimeContract(),0);
        vm.expectRevert(notOwner.selector);    //Revert if not the owner. Custom error from SimpleStorage.
        simpleStorageInstance.setOwnerData();
    }

    function testDonateToOwnerValidPath() public {
        uint ownerBalanceStart = address(this).balance;
        assertEq(ownerBalanceStart,79228162514264337593543950335);
        vm.deal(address(0),ownerBalanceStart);
        uint prankBalanceStart = address(this).balance;
        assertEq(ownerBalanceStart,79228162514264337593543950335);
        assertEq(address(simpleStorageInstance).balance, 0);
        vm.startPrank(address(0)); //Change the address to not be the owner. The owner is address(this) in this context.
        uint msgValueWei = 1;
        vm.expectEmit(false,false,false,false); // Events have bool flags for indexed topic parameters in order (3 topics possible) along with arguments that might not be indexed (last flag). You can also check which address sent the event.
        emit donateToOwnerEvent();
        assertEq(address(simpleStorageInstance).balance, 0);        
        simpleStorageInstance.donateToOwner{value: msgValueWei}();
        vm.stopPrank(); //Stop prank since we don't need to be another address anymore for increasing the owner balance from a transfer.
        assertEq(address(simpleStorageInstance).balance, 0);
        assertEq(address(this).balance, ownerBalanceStart+1);
        assertEq(address(0).balance, prankBalanceStart-1);
    }

    function testDonateToOwnerRevertPath() public {
        vm.expectRevert(msgValueZero.selector);  //Revert if MSG.VALUE is 0. Custom error from SimpleStorage.
        simpleStorageInstance.donateToOwner();   //MSG.VALUE is not set for call, so it is 0.
    }
}
```

  </TabItem>
</Tabs>

## General Test Fast

Once you have a development and test contract setup, run a quick test with:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge test
```

  </TabItem>
</Tabs>

## Specific Test Case Log

If you want a detailed overview of how a specific test failed or passed, add a match test add verbosity flag.

:::tip
The more v characters you add to the verbosity flag, the more detailed the test report will be.
:::

The example below has level 4 verbosity for the match test contract function ```testDonateToOwnerValidPath```:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge test -vvvv -match-test testDonateToOwnerValidPath
```

  </TabItem>
</Tabs>

## General Test Coverage Percentage

If you want to see how many lines and branches you are hitting with all tests:

1. Run

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge coverage --report lcov && genhtml lcov.info -o report --branch-coverage
```
  </TabItem>
</Tabs>

2. Check coverage results in
```
report/index.html
```
The coverage report should look like this in your web browser:
![foundryCoverageLCOV](/img/foundry/foundryCoverageLCOV.jpg)

3. Delete the following before pushing to GitHub to keep commits lightweight:
```
lcov.info
reports
```
## Fork Network General Test Coverage Percentage

The test coverage above uses a local network to save time.
However, some contract applications integrate with contracts already deployed to a network.
If you want to test contracts deployed to specific networks and know your code coverage, run the following command with a RPC URL endpoint
for the ```--fork-url``` flag:

:::tip
Do local unit testing first before forking a network to speed up testing time.
:::

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge coverage --fork-url $mainnetHTTPS_InfuraAPIKey --report lcov && genhtml lcov.info -o report --branch-coverage
```
  </TabItem>
</Tabs>

## Fork Networks using Anvil and Metamask

Run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
anvil --block-time 12 --fork-url $mainnetHTTPS_InfuraAPIKey
```
  </TabItem>
</Tabs>

Select a private key wallet that has funds into Metamask from the Anvil terminal.

Connect to Anvil in Metamask with the following data:

```shell
New RPC URL: http://127.0.0.1:8545
Chain ID: 31337
```

## Deploy to Goerli with EIP-1559 and verify with Etherscan

You will need the following environmental variables setup to do this.
You can set these variables in your ```.bashrc``` file, or in a local ```.env``` folder:

```
$goerliHTTPS_InfuraAPIKey
$devTestnetPrivateKey
$etherscanApiKey
```

:::tip
Using

```
forge create
```

will use EIP-1559 for the deployment transaction by default.

:::

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge create --rpc-url $goerliHTTPS_InfuraAPIKey --etherscan-api-key $etherscanApiKey --verify --private-key $devTestnetPrivateKey src Contract.sol:SimpleStorage
```

  </TabItem>
</Tabs>


## Deploying to Shardeum Sphinx with Legacy Transaction

If the following Goerli deployment worked, the following Shardeum deployment should work as well.

:::danger[WARNING]
The

```
--legacy
```

flag is used when deploying a smart contract using Legacy gas parameters for the transaction.
This is important, since Shardeum currently doesn't support EIP-1559.
Otherwise, you will see the following error when attempting to deploy to Shardeum:

```
EIP-1559 not activated
```

:::


:::danger[WARNING]
The terminal might not notify you if the contract deployment worked.
Check the Shardeum Explorer after a transaction cycle to see if the contract deployed from the signer address from the private key used.
:::


<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
forge create --legacy --rpc-url 	https://sphinx.shardeum.org/ --private-key $devTestnetPrivateKey src/Contract.sol:SimpleStorage
```

  </TabItem>
</Tabs>
