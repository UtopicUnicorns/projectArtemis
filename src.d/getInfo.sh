#!/bin/bash

totMem=$(free --mega | grep 'Mem:' | awk '{print $2}');
usedMem=$(free --mega | grep 'Mem:' | awk '{print $3}');
freeMem=$(free --mega | grep 'Mem:' | awk '{print $4}');
upTime=$(uptime -p | cut -c4-);
cpuUse=$(awk '{u=$2+$4; t=$2+$4+$5; if (NR==1){u1=u; t1=t;} else print ($2+$4-u1) * 100 / (t-t1) ""; }' <(grep 'cpu ' /proc/stat) <(sleep 1;grep 'cpu ' /proc/stat) | sed 's/\.[0-9]*//');
diskUse=$(df --output=pcent /boot | grep -v Use | sed -r 's/\s+//g');
memUsePerc=$(free | grep Mem | awk '{print $3/$2 * 100.0}' | sed 's:\.[^|]*::g');
fetchSpec=$(awk -F= '$1=="PRETTY_NAME" { print $2 ;}' /etc/os-release | cut -d "\"" -f 2);

echo "{\"totMem\":\"$totMem\", \"usedMem\":\"$usedMem\", \"freeMem\":\"$freeMem\", \"upTime\":\"$upTime\", \"cpuUse\":\"$cpuUse\", \"diskUse\":\"$diskUse\", \"memUsePerc\":\"$memUsePerc\", \"fetchSpec\":\"$fetchSpec\"}" > /private-backup/webSite/getInfoOut.json

