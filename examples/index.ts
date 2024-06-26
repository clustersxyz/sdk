import { Clusters, getProfileUrl, getImageUrl, isNameValid } from '../src/index';

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

console.log('-- utils --');

console.log('getImageUrl("clusters/")', getImageUrl('clusters/'));
console.log('getProfileUrl("clusters/")', getProfileUrl('clusters/'));

console.log(
  'getRegistrationTransaction',
  await clusters.getRegistrationTransaction(
    [{ name: 'namethatdoesntexist1' }],
    '0x0000000000000000000000000000000000000001',
    '1',
    '0x0000000000000000000000000000000000000005',
  ),
);

console.log(isNameValid('abc123'));
console.log(isNameValid('abc_123'));
console.log(isNameValid('abc-123'));
console.log(isNameValid('abc!123')); // Fails
