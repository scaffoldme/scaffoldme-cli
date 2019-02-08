#!/bin/bash

## we still use cloudbees' script for installing node.
NODE_EXISTS=`which node` || echo "node does not exist"

if [ "$NODE_EXISTS" = "" ];then

    echo "installing node"
    NVM_HOME=/home/ubuntu/.nvm

    rm -rf $NVM_HOME || echo "nvm folder does not exist. lets continue"

   # wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.18.0/install.sh | bash || echo
     wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash || echo
     source ~/.nvm/nvm.sh
     nvm install 6.9.1 && nvm use 6.9.1

    # ( which node && echo "node already installed..." ) || ( echo "installing nodejs-legacy..." && sudo apt-get install -y nodejs-legacy &&  echo "nodejs installed successfully..." )
    # ( which npm && echo "npm already installed..." ) || ( echo "installing npm ... " && sudo apt-get install -y npm && echo "npm installed successfully..." )


    NODE_EXISTS=`which node`  || echo "node does not exist yet!"
    if [ "$NODE_EXISTS" = "" ];then
        echo "node installation failed.."
        exit 1
    else
        echo "node installation was a success. lets continue"
    fi

else
    echo "node already installed. skipping installation..."
fi

