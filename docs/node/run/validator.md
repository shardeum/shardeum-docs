---
title: Validator
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to run a validator node

## Benefits of operating a validator

Running your own validator:

    -enhances Shardeum network security
    -earns testnet SHM from user transaction fees

## Validating Transactions

Shardeum validators perform consensus on transactions.

Shardeum validators with honest transaction consensus earn testnet SHM.

Shardeum validators with dishonest transaction consensus will have their testnet SHM slashed.

## Minimum Hardware Requirements

```
-250 GB SSD storage
-Quad core CPU less than 10 years old if self hosting
-Dual core CPU works if hosted with newer Xeons / EPYC
-16 GB of ram,  4+ GB of virtual memory recommended
-Hosting: 8 GB RAM + 8 GB Virtual Memory
```

## How do I run a validator on Shardeum?

## Step 1: Install prerequisites

### Open a Shell terminal

Access the terminal interface for Shell CLI commands:

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux" default>

```
(Press at the same time)
Ctrl + Alt + T
```

  </TabItem>
    <TabItem value="mac" label="Mac" default>

```
(Press at the same time)
Command + Space bar
(Type)
Terminal
```

  </TabItem>
</Tabs>


### Install package managers

We will use curl in this tutorial to download files:

:::info
Mac comes with curl, so we will install homebrew with curl (which will handle handle packages like apt in Linux).
:::

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux" default>

```shell
sudo apt-get install curl
```

  </TabItem>
  <TabItem value="mac" label="Mac" default>

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

add Homebrew to your ```PATH```:

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"'
eval "$(/opt/homebrew/bin/brew shellenv)"
```

  </TabItem>

</Tabs>

### Update package managers

Make sure your packages are up to date first:

:::info
When you add sudo to a command, the output will ask for your system password for admin verification.
:::

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux" default>

```shell
sudo apt update
```

  </TabItem>
  <TabItem value="mac" label="Mac" default>

```shell
brew update
```

  </TabItem>

</Tabs>

### Install docker

Install docker with docker.io:

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux" default>

```shell
sudo apt install docker.io
```

  </TabItem>
  <TabItem value="mac" label="Mac" default>

```shell
brew install docker
```

  </TabItem>

</Tabs>

Check that docker is working with (should return version 20.10.12 or higher):

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
docker --version
```

  </TabItem>

</Tabs>

### Install docker-compose

Curl request docker-compose:

<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux" default>

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

  </TabItem>
  <TabItem value="mac" label="Mac" default>

```shell
brew install docker-compose
```

   </TabItem>
</Tabs>

Setup permissions for docker-compose:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
sudo chmod +x /usr/local/bin/docker-compose
```

  </TabItem>
</Tabs>

Check that docker-compose is working with (should return version 1.29.2 or higher):

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
docker-compose --version
```

  </TabItem>
</Tabs>

:::tip
Shardeum Validator support on Windows will be coming in the future.
:::

## Step 2: Download and install validator

Run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
curl -O https://gitlab.com/shardeum/validator/dashboard/-/raw/main/installer.sh && chmod +x installer.sh && ./installer.sh
```

  </TabItem>
</Tabs>

:::warning
If you see error:

```shell
Docker daemon is not running
```

run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
sudo usermod -a -G docker $USER && newgrp docker
```

  </TabItem>
</Tabs>

if that does not work, also try:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
sudo service docker start
```

  </TabItem>
</Tabs>

then try to install with the curl command again.
:::

The terminal will ask questions about your setup settings.

Give permission to collect validator data for bug reporting:

```shell
By running this installer, you agree to allow the Shardeum team to collect this data. (y/n)?:
```

Enter y to setup the web based dashboard:

```shell
Do you want to run the web based Dashboard? (y/n): y
```

Set a password for dashboard access:

```shell
Set the password to access the Dashboard:
```

Add a custom session port for the web based dashboard or hit enter for port 8080:

```shell
Enter the port (1025-65536) to access the web based Dashboard (default 8080):
```

Set the first p2p port (default 9001):

```shell
This allows p2p communication between nodes. Enter the first port (1025-65536) for p2p communication (default 9001):
```

Set the second p2p port (default 10001):

```shell
Enter the second port (1025-65536) for p2p communication (default 10001):
```

Add a custom path or install to root:

```shell
What base directory should the node use (defaults to ~/.shardeum):
```

Wait for the installation process to complete.

:::caution
If you are behind a router and you are using ports 9001 and 10001 for p2p communication,
make sure ports 9001 and 10001, are forwarded (be careful doing this since it will modify your firewall):

https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/

Reference:

https://gitlab.com/shardeum/validator/dashboard/
:::

## Step 3: Open validator CLI

Make sure you are in the root directory by running:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
cd
```

  </TabItem>
</Tabs>

Go to the hidden Shardeum directory:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
cd .shardeum
```

  </TabItem>
</Tabs>

Start the CLI by running the following shell script:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
./shell.sh
```

  </TabItem>
</Tabs>

:::warning
If you see error:

```golang
Got permission denied while trying to connect to the Docker daemon socket at
unix:///var/run/docker.sock:
Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/shardeum-dashboard/json":
dial unix /var/run/docker.sock:
connect:
permission denied
```

run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
sudo usermod -a -G docker $USER && newgrp docker
```

  </TabItem>
</Tabs>

if that does not work, also try:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
sudo service docker start
```

  </TabItem>
</Tabs>

then try to start the shell script again.
:::

## Step 4: Open validator GUI

While inside the shell script, run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli gui start
```

  </TabItem>
</Tabs>

Go to your web browser and go to:

<Tabs groupId="validator-local-or-server">
  <TabItem value="local" label="Local" default>

```shell
https://localhost:8080/
```

  </TabItem>
  <TabItem value="server" label="Server" default>

```shell
https://<server_ip>:8080/
```

  </TabItem>
</Tabs>


:::caution
You might see a warning page when trying to access this address in your web browser.
Ignore this warning and continue to the validator dashboard. Another way to work around this warning:

<Tabs>
  <TabItem value="firefox" label="Firefox" default>

```
From the three bar button (hamburger) menu button, go to Settings

Click on “Privacy & Security” on the left.

Scroll down to locate “View Certificates” and click that button.

Click the “Servers” tab, then click “Add Exception”.

Type: “https://localhost:8080” (or your remote/VPS server’s IP and port),
then click “Get Certificate”, then click “Confirm Security Exception”.

The result should be the server/localhost in the list, click “OK”.

Refresh the operator dashboard page and the certificate error should be gone.
```

  </TabItem>
  <TabItem value="chrome" label="Chrome" default>

```
Click on the “Not secure” alert and select/click on “Certificate is not valid”.

Click on the “Details” tab, then click n “localhost” in the “Certificate Hierarchy” box and click the “Export” button.

Click on the “Details” tab, then click on
“mynode-sphinx.shardeum.local” in the “Certificate Hierarchy” box and click the “Export” button.

The result of the steps above are two certificate files save in a location to be used in the following steps.

Type: chrome://settings in address bar, hit enter.

Click on “Privacy and security” on the left menu. Then click “Security” from the list in the main window.

Scroll down to find “Manage device certificates” in the main windows and select it.

Click the “Import” button.

Follow the import prompts.

Place the ‘mynode-sphinx.shardeum.local.crt” in the “Trusted Root Cert… Auth..” folder.

Click “Yes” and then “OK”.

Click “Import” once more.

Then follow the import prompts.

Place the ‘localhost.crt” in the “Personal” folder.

Close all Chrome windows (as in Exit Chrome).

When you have successfully restarted chrome, the operator dashboard will not show with a white lock.
```

  </TabItem>

</Tabs>

:::

You will be asked for your password set during setup.

![loginPage.jpg](/img/node/run/validator/loginPage.jpg)

:::danger
The login will fail even if you put no password during the setup process.
To set a new password inside the validator CLI:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli gui set password <type_new_password__here>
```

  </TabItem>
</Tabs>

:::

You should see the “Overview” page for the Shardeum Validator Dashboard in your web browser:

![overviewBetanet.jpg](/img/node/run/validator/overviewBetanet.jpg)

## Step 5: Start validator

Go to the “Maintenance” page, then click the “Start Node” button in the top left white box:

![startBetanet.jpg](/img/node/run/validator/startBetanet.jpg)

(Same as running)

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli start
```

  </TabItem>
</Tabs>

Wait and refresh the page.

The node is running correctly if the “Start Node” button now says “Stop Node”. If you want to stop tne node with the CLI:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli stop
```

  </TabItem>
</Tabs>

![startedBetanet.jpg](/img/node/run/validator/startedBetanet.jpg)

## Step 6: Monitor validator

Go to “Performance” to see your node’s hardware performance here:

![performanceBetanet.jpg](/img/node/run/validator/performanceBetanet.jpg)

For more details about your node status run the following inside the CLI:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli status
```

  </TabItem>
</Tabs>

:::danger
If your node becomes inactive, try checking its status.
:::

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
pm2 list
```

  </TabItem>
</Tabs>

Reset the validator from the list by running:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
pm2 delete [id]
```

  </TabItem>
</Tabs>

## Step 7: Connect Wallet to Betanet

[Connect to Sphinx 1.X with your wallet by clicking the button linked here](/Network/Endpoints#connect-wallet)

## Step 8: Get SHM from Betanet Faucet

[Shardeum Twitter SHM Faucet Guide for Sphinx 1.X](/Faucet/Claim#shardeum-faucet-website)

## Step 9: Stake SHM to validator

After you start the validator, go to the “Settings” page. You will be asked to connect your wallet:

![connectWalletBetanet.jpg](/img/node/run/validator/connectWalletBetanet.jpg)

After you connect your wallet, you should see the following:

![connectedWalletOptions.jpg](/img/node/run/validator/connectedWalletOptions.jpg)

When you click "Add Stake", you will see the following:

![connectedWalletAddStake.jpg](/img/node/run/validator/connectedWalletAddStake.jpg)

```
-Stake Wallet Address [wallet connected]
-Nominee Public Key [filled in automatically while validator is running]
-Stake amount (SHM) [empty and is in units ether not wei]
```

This example has filled in 10 SHM tokens to stake.

Once all fields are filled, click the “Stake” button.

Your wallet will ask you to sign the transaction stake your SHM.

Once the transaction is signed and complete, you have staked your SHM tokens successfully.

:::tip
If your node status is on Standby and you have 10 SHM or more staked, your validator node is setup correctly.

The network will automatically add your validator to be active in the network.

The time to be added as an active validator will vary based on network load and validators in the network.
:::

If you have staked before, you can "Remove Stake".

:::caution
(however you will stop getting testnet SHM rewards).
:::

:::danger
If you see your validator IP address as "0.0.0.0":

Go into the operator dashboard docker (may be different if you customized install location:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
cd ~/.shardeum
./shell.sh
```

  </TabItem>

</Tabs>

Get your node's external IP:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
curl https://ipinfo.io/ip
```

  </TabItem>

</Tabs>

The returned IP in the format of nnn.nnn.nnn.nnn is your EXTERNAL_IP.

Set the number above in place of EXTERNAL_IP:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
export APP_IP="EXTERNAL_IP"
```

  </TabItem>

</Tabs>

:::

## Validator

### Check Installed Version

:::warning
New validator versions will be released over time. 
It is necessary to keep your validator updated 
by checking the minimum version required and your current version periodically.
:::

Run:

<Tabs groupId="validator-local-or-server">
  <TabItem value="local" label="Local" default>

```shell
curl localhost:9001/nodeinfo
```

  </TabItem>
  <TabItem value="server" label="Server" default>

```shell
curl <server_ip>:9001/nodeinfo
```

  </TabItem>
</Tabs>

### Update

Run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
cd
cd .shardeum
./update.sh
```

  </TabItem>
</Tabs>

:::caution
You might manually have to start the GUI afterwards with:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli gui start
```

  </TabItem>
</Tabs>

:::

## CLI And GUI

### Check Installed Versions

Run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli version
```

  </TabItem>

</Tabs>


### Update

Run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli update
```

  </TabItem>
</Tabs>

### Commands

To see all CLI commands, run:

<Tabs>
  <TabItem value="shell" label="Shell" default>

```shell
operator-cli --help
```

  </TabItem>
</Tabs>

## Uninstall Validator

Useful if your validator is outdated and you want to clean your last installation.

You can delete the validator folder while in your root directory with:

```shell
rm -rf .shardeum
```

You can also delete docker containers and images that the Shardeum validator was using.

:::danger
These commands will delete all docker images and containers on your computer!

Delete all docker containers:

```shell
docker rm -vf $(docker ps -aq)
```

Delete all docker images:

```shell
docker rmi -f $(docker images -aq)
```

:::
