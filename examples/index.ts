import { Clusters } from '../lib/index';

const clusters = new Clusters();

console.log(
  'getName(0x5755d1dcea21caa687339c305d143e6e78f96adf)',
  await clusters.getName('0x5755d1dcea21caa687339c305d143e6e78f96adf'),
);
console.log('getAddress(clusters/)', await clusters.getAddress('clusters/'));
console.log('getAddress(clusters/main)', await clusters.getAddress('clusters/main'));
console.log('getCluster(clusters/)', await clusters.getCluster('clusters/'));
