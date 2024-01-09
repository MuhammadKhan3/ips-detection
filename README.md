# Introdution

The ips-detection module is a powerful tool for discovering active IP addresses within the same local network, ideal for scenarios like identifying devices on a shared Wi-Fi network. It employs efficient techniques, including pinging, to probe a range of IP addresses and determine which ones are currently active.

# Features
- Discover and list live devices within a specified IP range.
- Suitable for applications requiring dynamic detection of devices on a local network.
- Efficient and concise solution for IP address discovery within the same Wi-Fi network.

# Usage
1. Install the module using npm:
   ```bash
   npm install ips-detection
   ```

2. Include it in your Node.js application:
   ```bash
     const ipsDetection = require('ips-detection');
   ```

3. Utilize the getActiveIPs function to retrieve a list of active IPs:
   ```bash    
    const activeIPs = new ipsDetection();
   ```
4. Get the Active IPs Function
   ```bash    
    const Ips =await activeIps.getIPs();
   ```

Adjust the content based on the specific features and usage details of your "ips-detection" module.
