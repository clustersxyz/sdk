import { Clusters } from '../lib/index';

const cluster = new Clusters();

console.log(
  'resolveName(0x5755d1dcea21caa687339c305d143e6e78f96adf)',
  await cluster.resolveName('0x5755d1dcea21caa687339c305d143e6e78f96adf'),
);
console.log('resolveAddress(clusters/)', await cluster.resolveAddress('clusters/'));
console.log('resolveAddress(clusters/main)', await cluster.resolveAddress('clusters/main'));
console.log('resolveWallets(clusters/)', await cluster.resolveWallets('clusters/'));
