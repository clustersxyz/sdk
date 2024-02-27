import { Clusters } from '../lib/index';

const clusters = new Clusters();

console.log(
  'getName("0x5755d1dcea21caa687339c305d143e6e78f96adf")',
  await clusters.getName('0x5755d1dcea21caa687339c305d143e6e78f96adf'),
);
console.log('getAddress("clusters/")', await clusters.getAddress('clusters/'));
console.log('getAddress("clusters/main")', await clusters.getAddress('clusters/main'));
console.log('getCluster("clusters/")', await clusters.getCluster('clusters/'));

console.log('-- bulk --');

console.log(
  'getNames(["0x5755d1dcea21caa687339c305d143e6e78f96adf", "0xccdead94e8cf17de32044d9701c4f5668ad0bef9"])',
  await clusters.getNames(['0x5755d1dcea21caa687339c305d143e6e78f96adf', '0xccdead94e8cf17de32044d9701c4f5668ad0bef9']),
);
console.log(
  'getAddresses(["clusters/", "clusters/main", "layerzero/", "layerzero/main"])',
  await clusters.getAddresses(['clusters/', 'clusters/main', 'layerzero/', 'layerzero/main']),
);
console.log('getClusters(["clusters/", "layerzero/"])', await clusters.getClusters(['clusters/', 'layerzero/']));
