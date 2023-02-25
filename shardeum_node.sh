#!/usr/bin/env bash

while true
do

# Logo
echo "#####################################################################################"
curl -s https://raw.githubusercontent.com/nodersteam/script/main/shardeumlogo.sh | bash
echo "#####################################################################################"


PS3='Select an action: '
options=(
"Prepare the server for installation"
"Install Shardeum Node"
"Dashboard addres"
"Stop and delite node"
"Exit")
select opt in "${options[@]}"
               do
                   case $opt in
                   
"Prepare the server for installation")

cat << EOF

PREPARATION HAS BEGUN 

EOF

sleep 3
# Step 1: Install required packages
echo "Step 1/2: Installing required packages..."
sudo apt-get upgrade -y > /dev/null 2>&1
sudo apt-get install curl wget jq libpq-dev libssl-dev build-essential pkg-config openssl ocl-icd-opencl-dev libopencl-clang-dev libgomp1 -y > /dev/null 2>&1

# Step 2: Install Docker Compose
echo "Step 2/2: Installing Docker Compose..."
sudo apt install docker-compose -y > /dev/null 2>&1


echo "Installation complete."

#INSTALL DOCKER
sleep 3

cat << EOF

INSTALL DOCKER AND DOCKER-COMPOSE 

EOF
echo "Checking if Docker is already installed..."
if command -v docker >/dev/null 2>&1; then
  echo "Docker is already installed on this machine."
else
  echo "Installing Docker..."

  echo "Step 1/6: Installing dependencies..."
  sudo apt-get install curl gnupg apt-transport-https ca-certificates lsb-release -y >/dev/null 2>&1

  echo "Step 2/6: Adding Docker GPG key to keyring..."
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg >/dev/null 2>&1

  echo "Step 3/6: Adding Docker repository to sources list..."
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 2>&1

  echo "Step 4/6: Updating package list..."
  sudo apt-get update >/dev/null 2>&1

  echo "Step 5/6: Installing Docker..."
  sudo apt-get install docker-ce docker-ce-cli containerd.io -y >/dev/null 2>&1

  echo "Step 6/6: Docker installation completed."
  echo "Docker has been successfully installed."
fi

#Check if Docker Compose is installed
if command -v docker-compose >/dev/null 2>&1; then
echo "Docker Compose is already installed on this machine."

else

#Installing Docker Compose
#Download the Docker Compose binary
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose >/dev/null 2>&1

#Apply executable permissions to the Docker Compose binary
sudo chmod +x /usr/local/bin/docker-compose
fi

#Verify the installation of Docker and Docker Compose

echo " "
echo "####################################################################################"

docker --version
docker-compose --versio

echo "The server is ready!"
break
;;
            
"Install Shardeum Node")

cat << EOF


INSTALLATION HAS STARTED

EOF

read -p "During this early stage of Betanet the Shardeum team will be collecting some performance and debugging info from your node to help improve future versions of the software.
This is only temporary and will be discontinued as we get closer to mainnet.
Thanks for running a node and helping to make Shardeum better.

By running this installer, you agree to allow the Shardeum team to collect this data. (y/n)?: " WARNING_AGREE
WARNING_AGREE=${WARNING_AGREE:-y}

if [ $WARNING_AGREE != "y" ];
then
  echo "Diagnostic data collection agreement not accepted. Exiting installer."
  exit
fi


# Check all things that will be needed for this script to succeed like access to docker and docker-compose
# If any check fails exit with a message on what the user needs to do to fix the problem
command -v git >/dev/null 2>&1 || { echo >&2 "'git' is required but not installed."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo >&2 "'docker' is required but not installed. See https://gitlab.com/shardeum/validator/dashboard/-/tree/dashboard-gui-nextjs#how-to for details."; exit 1; }
if command -v docker-compose &>/dev/null; then
  echo "docker-compose is installed on this machine"
elif docker --help | grep -q "compose"; then
  echo "docker compose subcommand is installed on this machine"
else
  echo "docker-compose or docker compose is not installed on this machine"
  exit 1
fi

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker-safe() {
  if ! command -v docker &>/dev/null; then
    echo "docker is not installed on this machine"
    exit 1
  fi

  if ! docker $@; then
    echo "Trying again with sudo..."
    sudo docker $@
  fi
}

docker-compose-safe() {
  if command -v docker-compose &>/dev/null; then
    cmd="docker-compose"
  elif docker --help | grep -q "compose"; then
    cmd="docker compose"
  else
    echo "docker-compose or docker compose is not installed on this machine"
    exit 1
  fi

  if ! $cmd $@; then
    echo "Trying again with sudo..."
    sudo $cmd $@
  fi
}

get_ip() {
  local ip
  if command -v ip >/dev/null; then
    ip=$(ip addr show $(ip route | awk '/default/ {print $5}') | awk '/inet/ {print $2}' | cut -d/ -f1)
  elif command -v ifconfig >/dev/null; then
    ip=$(ifconfig | awk '/inet addr/{print substr($2,6)}')
  else
    echo "Error: neither 'ip' nor 'ifconfig' command found"
    return 1
  fi
  echo $ip
}

get_external_ip() {
  external_ip=''
  external_ip=$(curl -s https://api.ipify.org)
  if [[ -z "$external_ip" ]]; then
    external_ip=$(curl -s http://checkip.dyndns.org | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")
  fi
  if [[ -z "$external_ip" ]]; then
    external_ip=$(curl -s http://ipecho.net/plain)
  fi
  if [[ -z "$external_ip" ]]; then
    external_ip=$(curl -s https://icanhazip.com/)
  fi
  if [[ -z "$external_ip" ]]; then
    external_ip=$(get_ip)
    if [ $? -eq 0 ]; then
      echo "The IP address is: $IP"
    else
      external_ip="localhost"
    fi
  fi
  echo $external_ip
}

if [[ $(docker-safe info 2>&1) == *"Cannot connect to the Docker daemon"* ]]; then
    echo "Docker daemon is not running"
    exit 1
else
    echo "Docker daemon is running"
fi

cat << EOF

1. Get inf from user

EOF

read -p "Do you want to run the web based Dashboard? (y/n): " RUNDASHBOARD
RUNDASHBOARD=${RUNDASHBOARD:-y}

while true; do
  read -p "Set the password to access the Dashboard: " -s input
  echo
  if [[ -n "$input" ]] && [[ ! "$input" =~ \  ]]; then
    DASHPASS=$input
    break
  else
    echo "Invalid input, try again."
  fi
done

while :; do
  read -p "Enter the port (1025-65536) to access the web based Dashboard (default 8080): " DASHPORT
  DASHPORT=${DASHPORT:-8080}
  [[ $DASHPORT =~ ^[0-9]+$ ]] || { echo "Enter a valid port"; continue; }
  if ((DASHPORT >= 1025 && DASHPORT <= 65536)); then
    DASHPORT=${DASHPORT:-8080}
    break
  else
    echo "Port out of range, try again"
  fi
done

while :; do
  echo "To run a validator on the Sphinx network, you will need to open two ports in your firewall."
  read -p "This allows p2p commnication between nodes. Enter the first port (1025-65536) for p2p comminucation (default 9001): " SHMEXT
  SHMEXT=${SHMEXT:-9001}
  [[ $SHMEXT =~ ^[0-9]+$ ]] || { echo "Enter a valid port"; continue; }
  if ((SHMEXT >= 1025 && SHMEXT <= 65536)); then
    SHMEXT=${SHMEXT:-9001}
  else
    echo "Port out of range, try again"
  fi
  read -p "Enter the second port (1025-65536) for p2p comminucation (default 10001): " SHMINT
  SHMINT=${SHMINT:-10001}
  [[ $SHMINT =~ ^[0-9]+$ ]] || { echo "Enter a valid port"; continue; }
  if ((SHMINT >= 1025 && SHMINT <= 65536)); then
    SHMINT=${SHMINT:-10001}
    break
  else
    echo "Port out of range, try again"
  fi
done

read -p "What base directory should the node use (defaults to ~/.shardeum): " NODEHOME
NODEHOME=${NODEHOME:-~/.shardeum}

APPSEEDLIST="archiver-sphinx.shardeum.org"
APPMONITOR="monitor-sphinx.shardeum.org"

cat <<EOF

2. Pull Compose Project

EOF

if [ -d "$NODEHOME" ]; then
  echo "Removing existing directory $NODEHOME..."
  rm -rf "$NODEHOME" >/dev/null 2>&1
fi

echo "Step 1/2: Cloning the repository..."
git clone https://gitlab.com/shardeum/validator/dashboard.git ${NODEHOME} >/dev/null 2>&1 &&
echo "Step 1/2: Entering and setting permissions..."
cd ${NODEHOME} >/dev/null 2>&1 &&
chmod a+x ./*.sh >/dev/null 2>&1
echo "100%. The repository has been successfully cloned and the scripts have been given execute permissions."

cat <<EOF

3. Create and Set .env File

EOF

echo "Writing configuration data to .env file..."
SERVERIP=$(get_external_ip)
echo "IP address: $SERVERIP"
echo "Step 1/3:Entering the directory $NODEHOME..."
cd ${NODEHOME} &&
echo "Step 2/3:Creating .env file..."
touch ./.env
echo "Step 3/3:Writing data to .env file..."
cat >./.env <<EOL
APP_IP=auto
APP_SEEDLIST=${APPSEEDLIST}
APP_MONITOR=${APPMONITOR}
DASHPASS=${DASHPASS}
DASHPORT=${DASHPORT}
SERVERIP=${SERVERIP}
SHMEXT=${SHMEXT}
SHMINT=${SHMINT}
EOL
echo "The .env file has been successfully created and the data has been written to it."

cat <<EOF

4. Building base image

EOF

echo "Building Docker image..."
cd ${NODEHOME}
echo "Step 1/3: Entering the working directory."
echo "Step 2/3: Building the Docker image."
docker-safe build --no-cache -t test-dashboard -f Dockerfile --build-arg RUNDASHBOARD=${RUNDASHBOARD} . >/dev/null 2>&1
echo "Step 3/3: Docker image build complete."

cat <<EOF

5. Start Compose Project

EOF

cd ${NODEHOME}

echo "Step 1/3: Updating ports in the docker-compose file..."
if [[ "$(uname)" == "Darwin" ]]; then
sed -i '' "s/- '8080:8080'/- '$DASHPORT:$DASHPORT'/" docker-compose.yml >/dev/null 2>&1
sed -i '' "s/- '9001-9010:9001-9010'/- '$SHMEXT:$SHMEXT'/" docker-compose.yml >/dev/null 2>&1
sed -i '' "s/- '10001-10010:10001-10010'/- '$SHMINT:$SHMINT'/" docker-compose.yml >/dev/null 2>&1
else
sed -i "s/- '8080:8080'/- '$DASHPORT:$DASHPORT'/" docker-compose.yml >/dev/null 2>&1
sed -i "s/- '9001-9010:9001-9010'/- '$SHMEXT:$SHMEXT'/" docker-compose.yml >/dev/null 2>&1
sed -i "s/- '10001-10010:10001-10010'/- '$SHMINT:$SHMINT'/" docker-compose.yml >/dev/null 2>&1
fi

echo "Step 2/3: Starting the Docker containers..."
docker-compose-safe() {
if command -v docker-compose &>/dev/null; then
cmd="docker-compose"
elif docker --help | grep -q "compose"; then
cmd="docker compose"
else
echo "docker-compose or docker compose is not installed on this machine"
exit 1
fi

if ! $cmd $@ >/dev/null 2>&1; then
echo "Trying again with sudo..."
sudo $cmd $@ >/dev/null 2>&1
fi
}

docker-compose-safe -f docker-compose.yml up -d >/dev/null 2>&1

echo "Step 3/3: Checking the logs to verify that the image has started..."
start_time=$(date +%s)
counter=0

while true; do
if docker-compose logs | grep -q "done" &>/dev/null; then
echo "Signature is okay, Shardeum node installed successfully. Continuing..."
cd $HOME
break
fi

current_time=$(date +%s)
elapsed_time=$((current_time-start_time))
if [ $elapsed_time -gt 600 ]; then
echo "Signature not okay. Exiting..."
exit 1
fi

counter=$((counter+1))
sleep 1
done

cd $HOME

#Do not indent
if [ $RUNDASHBOARD = "y" ]
then
DASHBORDADDRESS=$(wget -qO- eth0.me):8080
cat <<EOF
To use the Web Dashboard:
 1. Note the IP address that you used to connect to the node. This could be an external IP, LAN IP or localhost.
 2. Open a web browser and navigate to the web dashboard at:
EOF
echo https://$DASHBORDADDRESS
cat <<EOF
 3. Go to the Settings tab and connect a wallet.
 4. Go to the Maintenance tab and click the Start Node button.

If this validator is on the cloud and you need to reach the dashboard over the internet,
please set a strong password and use the external IP instead of localhost.
EOF
fi


cat <<EOF

To use the Command Line Interface:
 1. Navigate to the Shardeum home directory ($NODEHOME).
 2. Enter the validator container with ./shell.sh.
 3. Run "operator-cli --help" for commands

EOF
break
;;

"Dashboard addres")

echo "Copy this address and paste it in the browser window. The dashboard will open where you need to start the node and perform a stake"
DASHBORDADDRESS=$(wget -qO- eth0.me):8080

echo https://$DASHBORDADDRESS
break
;;

"Stop and delite node")

docker-compose-safe() {
if command -v docker-compose &>/dev/null; then
cmd="docker-compose"
elif docker --help | grep -q "compose"; then
cmd="docker compose"
else
echo "docker-compose or docker compose is not installed on this machine"
exit 1
fi

if ! $cmd $@ &>/dev/null; then
echo "Trying again with sudo..."
sudo $cmd $@ &>/dev/null
fi
}
cd $HOME/.shardeum

echo "Step 1: Checking the status of the Docker Compose project..."
if docker-compose logs | grep -q "done" &>/dev/null; then
echo "Step 2: Docker Compose project is up, tearing it down..."
docker-compose-safe -f docker-compose.yml down &>/dev/null
echo "Step 3: Removing the .shardeum directory in the home folder..."
echo "Node deleted successfully."
cd &>/dev/null
rm -rf $HOME/.shardeum &>/dev/null
else
echo "Step 2: Docker Compose project is not up"
fi


break
;;

"Exit")
exit
;;
*) echo "invalid option $REPLY";;
esac
done
done
