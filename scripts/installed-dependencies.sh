#!/bin/bash -ex

# Copyright (c) 2018 BigBlueButton Inc.
#
# This program is free software; you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free Software
# Foundation; either version 3.0 of the License, or (at your option) any later
# version.
#
# BigBlueButton is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.

# BlueButton is an open source conferencing system.  For more informaiton see
#    http://www.bigbluebutton.org/.
#
# This bbb-install.sh scrip automates many of the instrallation and configuration
# steps at
#    http://docs.bigbluebutton.org/install/install.html
#
#
#  Examples
#
#  Install BigBlueButton and configure using server's external IP address
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200
#
#
#  Install BigBlueButton and configure using hostname bbb.example.com
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200 -s bbb.example.com
#
#
#  Install BigBlueButton with a SSL certificate from Let's Encrypt using e-mail info@example.com:
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200 -s bbb.example.com -e info@example.com
#
#
#  Install BigBlueButton with SSL + latest build of HTML5 client
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200 -s bbb.example.com -e info@example.com -t
#
#
#  Install BigBlueButton with SSL + GreenLight
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200 -s bbb.example.com -e info@example.com -g
#
#
#  All of the above
#
#    wget -qO- https://ubuntu.bigbluebutton.org/bbb-install.sh | bash -s -- -v xenial-200 -s bbb.example.com -e info@example.com -t -g
#

usage() {
    cat 1>&2 <<HERE
Installer script for setting up a BigBlueButton 2.0 server.  

HERE
}

main() {

  need_pkg nodejs
  
}

need_root() {
  if [ $EUID != 0 ]; then err "You must run this command as root."; fi
}

need_mem() {
  MEM=`grep MemTotal /proc/meminfo | awk '{print $2}'`
  MEM=$((MEM/1000))
  if (( $MEM < 3940 )); then err "Your server needs to have (at least) 4G of memory."; fi
}

need_apt-get-update() {
  # On some EC2 instanced apt-get is not run, so we'll do it 
  if [ -r /sys/devices/virtual/dmi/id/product_uuid ] && [ `head -c 3 /sys/devices/virtual/dmi/id/product_uuid` == "EC2" ]; then
    apt-get update
  elif [ -z "$ran_apt_get_update" ]; then 
    apt-get update 
  fi
  ran_apt_get_update="true"
}

need_pkg() {
  need_root
  need_apt-get-update
  if ! apt-cache search --names-only $1 | grep -q $1; then err "Unable to locate package: $1"; fi
  if ! dpkg -s $1 > /dev/null 2>&1; then apt-get install -yq $1; fi
}

need_ppa() {
  need_pkg software-properties-common
  if [ ! -f /etc/apt/sources.list.d/$1 ]; then
    add-apt-repository -y $2 
  fi
  if ! apt-key list $3 | grep -q $4; then
    add-apt-repository $2 -y
    if ! apt-key list $3 | grep -q $4; then
      err "Unable to setup PPA for $2"
    fi
  fi
}

check_apache2() {
  if dpkg -l | grep -q apache2; then err "You must unisntall apache2 first"; fi
}

main "$@" || exit 1
