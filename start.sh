#!/bin/sh

# Check if OUTBOUND_TRAFFIC_ALLOW is not set or is set to false, then drop outbound traffic on eth2
if [ -z "${OUTBOUND_TRAFFIC_ALLOW}" ] || [ "${OUTBOUND_TRAFFIC_ALLOW}" = "false" ]; then
    iptables -I OUTPUT -o eth2 -j DROP
fi

# Switch to the runner user to run the node application
exec su -s /bin/sh runner -c 'node --expose-gc /usr/bin/server.js'
