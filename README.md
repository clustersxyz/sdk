# [@clustersxyz/sdk](https://clusters.xyz) &middot; ![NPM](https://img.shields.io/npm/l/@clustersxyz/sdk?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![npm (tag)](https://img.shields.io/npm/v/@clustersxyz/sdk/latest) ![npm bundle size](https://img.shields.io/bundlephobia/min/@clustersxyz/sdk) [![Twitter URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2Fclustersxyz)](https://twitter.com/clustersxyz)

SDK for Clusters which resolves names, addresses, and wallets for finalized clusters.

Read more about the [clusters.xyz](https://clusters.xyz) via our [documentation](https://docs.clusters.xyz)

## Installation

```
npm install @clustersxyz/sdk
```

## Setup

```
import { Clusters } from "@clustersxyz/sdk"

const clusters = new Clusters();
```

## Usage

Check out our [/examples](https://github.com/clustersxyz/sdk/blob/main/examples) folder for usage.

## getName(address)

Get the cluster and wallet name based on an address

```
const clusterName = await clusters.getName('0x5755d1dcea21caa687339c305d143e6e78f96adf');
```

**Returns**

```
clusters/main
```

## getAddress(name)

Get the wallet associated to a cluster name. You can pass just the cluster name or also include the wallet name as shown in the 2 examples.

```
const clusterAddress_Option1 = await clusters.getAddress('clusters/');
const clusterAddress_Option2 = await clusters.getAddress('clusters/main');
```

**Returns**

```
{
  "type": "evm",
  "address": "0x5755d1dcea21caa687339c305d143e6e78f96adf",
  "name": "clusters/main",
  "isVerified": true
}
```

## getCluster(clusterName)

Get the cluster from a cluster name

```
const cluster = await clusters.getCluster('clusters/');
```

**Returns**

```
{
  "name": "clusters",
  "wallets": [
    {
      "type": "evm",
      "address": "0x5755d1dcea21caa687339c305d143e6e78f96adf",
      "name": "clusters/main",
      "isVerified": true
    }
  ]
}
```
