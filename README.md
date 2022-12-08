# Docker Storm

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nibh justo, cursus 
a justo et, lacinia cursus dui. Nullam ac sodales tellus. Sed maximus odio quam, eu 
condimentum justo semper sit amet. Aenean consectetur urna quis lacinia auctor. Maecenas 
eget mauris vitae purus suscipit tincidunt id in metus. Nullam mattis, lacus in pulvinar 
auctor, justo sapien vulputate leo, euismod vehicula turpis orci et velit. Nunc placerat 
odio vitae blandit tempor. Nunc dictum blandit eros et hendrerit.


## Prerequisites: 
Before being able to run Docker Storm it is expected that you already have a Docker Swarm running
with access to the IP addresses of each worker/manager. If not please follow the steps HERE
to create a basic Docker Swarm setup using Multipass

## Installation:

Clone Repo:
```sh
  git clone https://github.com/oslabs-beta/Docker-Storm.git
```

Install Dependencies:
```sh
  npm install
```

To start prometheus:
```sh
  prometheus --web.enable-lifecycle --config.file=prometheus/prometheus.yml
```
    
To start application:
```sh
  npm run electron
  OR
  npm start
```
## If you need to setup Docker Swarm
<details><summary></summary> 

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

## Contributers

- [@Kelvin Van](https://github.com/KelvinVan1)
- [@Shay Sheller](https://github.com/shaysheller)
- [@Kevin Tseng](https://github.com/Kevin-J-Tseng)
- [@Jeffrey Lee](https://github.com/jclee8888)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

