# Docker Storm &middot; ![Github Repo Size](https://img.shields.io/github/repo-size/oslabs-beta/Docker-Storm) ![GitHub License](https://img.shields.io/github/license/oslabs-beta/Docker-Storm) ![GitHub PR](https://img.shields.io/badge/PRs-welcome-orange) ![GitHub Commit](https://img.shields.io/github/last-commit/oslabs-beta/Docker-Storm) ![GitHub Stars](https://img.shields.io/github/stars/oslabs-beta/Docker-Storm)

## About
Docker Storm provides a easy to use interface in order to view important metrics regarding your current 
Docker Swarm cluster and the containers which are being run on them. With the ablity to add new ports
and create new users it's quick to implement and get up and running on your device. Metric tracking is done
using information gathered using cadvisor and node-exporter.

## Table of Contents
Application usage/documentation

- [Features](#features)
- [Documentation](#documentation)
- [Prerequisites](#prerequisites)

Installation guides

- [Installation](#installation)
- [Docker Swarm Setup (If needed)](#if-you-need-to-setup-docker-swarm)

Contributers and other info
- [Contributers](#contributers)
- [Contributing](#contributing)

## Features:
Live updating metric tracking in an organized grafana graph

![DockerStormMetrics](https://github.com/oslabs-beta/Docker-Storm/blob/dev/resources/media/mac.png?raw=true)

Settings page to change important user/system information in addition to the ability to add new servers/vm's to track 

![DockerStormSettings](https://github.com/oslabs-beta/Docker-Storm/blob/dev/resources/media/settings-screenshot.png?raw=true)

Users page to see all the current users and add new users

![DockerStormLogin](https://github.com/oslabs-beta/Docker-Storm/blob/dev/resources/media/users-screenshot.png?raw=true)

Login page with passwords encrypted using bcrypt

![DockerStormLogin](https://github.com/oslabs-beta/Docker-Storm/blob/dev/resources/media/login-screenshot.png?raw=true)

Signup page with fields to enter initial setup information

![DockerStormLogin](https://github.com/oslabs-beta/Docker-Storm/blob/dev/resources/media/signup-screenshot.png?raw=true)


[↥Back to top](#table-of-contents)

## Documentation:
You can access the documentation on this page: <br>
https://DockerStorm.com/Documentation

[↥Back to top](#table-of-contents)

## Prerequisites: 
- The host computer running Docker Storm (does not have to be part of the swarm) will need these installed
  - `Prometheus` (https://github.com/prometheus/prometheus) 
  - `Grafana` (https://github.com/grafana/grafana) 
    - Once installation is complete ensure that `allow_embedding` is enabled see docs for more info on how to enable this 
    - If you want to allow users to view your Grafana charts without having to log in ensure that anonymous which is under `[auth.anonymous]` is enabled see docs for more info on how to enable this 
    - (https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/)

Before being able  to run Docker Storm it is expected that you already have a Docker Swarm running with access to the IP addresses of each worker/manager. If not please follow the steps [HERE](#if-you-need-to-setup-docker-swarm) to create a basic Docker Swarm setup using Multipass 

Otherwise if you have a pre-existing swarm running make sure that:
  - All Manager/Worker machines have installed
    - `Node-Exporter` (https://github.com/prometheus/node_exporter) 
    - `cAdvisor` (https://github.com/google/cadvisor)


[↥Back to top](#table-of-contents)

## Installation:

Clone Repo:
```sh
  git clone https://github.com/oslabs-beta/Docker-Storm.git
```

Install Dependencies:
```sh
  npm install
```

Please start prometheus using the configuration file provided by Docker Storm:
```sh
  prometheus --web.enable-lifecycle --config.file=prometheus/prometheus.yml
```

Create a .env file in the root directory of Docker Storm and enter in a Postgres URI in this format:
```sh
  POSTGRES_URI = "PostgresURI Here"
```
All other keys will be asked upon first launch

<br>

To start application:
```sh
  npm run electron
  OR
  npm start
```

[↥Back to top](#table-of-contents)
## If you need to setup Docker Swarm
<details><summary>Docker Swarm Setup (Multipass)</summary> 

## VM Installation using Multipass (Mac OS): 
Install multipass (please make sure you have brew installed):
```sh
  brew install --cask multipass
```

Create VM's for each worker and manager:
```sh
  multipass launch docker --name manager1
  multipass launch docker --name worker1
  multipass launch docker --name worker2
```

## Install Node Exporter on each Multipass instance:
The below steps need to be replicated on all multipass instances

To run commands for your multipass instance prefix each command with
```sh
  multipass exec <username> –- <command>
```

Download the latest version of linux prometheus (example below downloads v.1.4.0):
```sh
  multipass exec <username> –- wget https://github.com/prometheus/node_exporter/releases/download/v1.4.0/node_exporter-1.4.0.linux-amd64.tar.gz
```

Extract the files:
```sh
  multipass exec <username> –- tar xvfz node_exporter-1.4.0.linux-amd64.tar.gz
```

Move the files to /usr/local/bin/: 
```sh
  multipass exec <username> –- sudo mv node_exporter-1.4.0.linux-amd64/node_exporter /usr/local/bin/
```

Add a node_exporter.service to add a new service:
```sh
  multipass exec <username> –- sudo vi /etc/systemd/system/node_exporter.service 
```
Insert using vim:
```sh
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=root
Group=root
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

Reload the Daemon then start node_exporter:
```sh
  multipass exec <username> –- sudo systemctl daemon-reload
  multipass exec <username> –- sudo systemctl start node_exporter
```

Ensure service has started without issue:
```sh
  multipass exec <username> –- sudo systemctl status node_exporter
```

Setup automatic launch on restart:
```sh
  multipass exec <username> –- sudo systemctl enable node_exporter
```
## Reveal the Docker Daemon on a manager node (only needs to be done once):
Add/edit the daemon.json:
```sh
  multipass exec <username> –- sudo vi /etc/docker/daemon.json
```
Insert in vim:
```sh
{
  “metrics-addr”: “0.0.0.0:9323”,
  “experimental”: true
}
```
</details>

<br>

[↥Back to top](#table-of-contents)

## Contributers

- [@Kelvin Van](https://github.com/KelvinVan1)
- [@Shay Sheller](https://github.com/shaysheller)
- [@Kevin Tseng](https://github.com/Kevin-J-Tseng)
- [@Jeffrey Lee](https://github.com/jclee8888)

[↥Back to top](#table-of-contents)

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `code of conduct` in `CODE_OF_CONDUCT.md`

[↥Back to top](#table-of-contents)