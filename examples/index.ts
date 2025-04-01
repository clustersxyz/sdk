import { Clusters, getProfileUrl, getImageUrl, isNameValid } from '../src/index';

const clusters = new Clusters({ isTestnet: true });

const AUTH_TOKEN = '';

console.log('getClusterByName', await clusters.getClusterByName('layerzero'));

/*
console.log('getAuthMessage', await clusters.getAuthMessage());

console.log(
  'getAuthToken',
  await clusters.getAuthToken(
    '0x0000000000000000000000000000000000000001',
    '2025-03-26T14:56:07.601Z',
    'evm',
    '0x5cff9c1362a71247da33887be2a44ac36a8724bb',
  ),
);

console.log('validateAuthToken', await clusters.validateAuthToken(AUTH_TOKEN));


console.log(
  'getName("0x5755d1dcea21caa687339c305d143e6e78f96adf")',
  await clusters.getName('0x5755d1dcea21caa687339c305d143e6e78f96adf'),
);
console.log(
  'getNames(["0x5755d1dcea21caa687339c305d143e6e78f96adf", "0xccdead94e8cf17de32044d9701c4f5668ad0bef9"])',
  await clusters.getNames(['0x5755d1dcea21caa687339c305d143e6e78f96adf', '0xccdead94e8cf17de32044d9701c4f5668ad0bef9']),
);
console.log(
  'getAddresses(["layerzero", "layerzero/main"])',
  await clusters.getAddresses(['layerzero', 'layerzero/main']),
);
console.log(
  'getNamesAvailability(["layerzero", "namethatdoesntexist1"])',
  await clusters.getNamesAvailability(['layerzero', 'namethatdoesntexist1']),
);

console.log(
  'getRegistrationTransactionEvm',
  await clusters.getRegistrationTransactionEvm(
    [{ name: 'namethatdoesntexist1' }],
    '0x0000000000000000000000000000000000000001',
    '1',
  ),
);
console.log(
  'getRegistrationTransactionSolana',
  await clusters.getRegistrationTransactionSolana(
    [{ name: 'namethatdoesntexist1' }],
    '1nc1nerator11111111111111111111111111111111',
  ),
);


console.log(
  'getTransactionStatus(0xffea3b29c64016772b7d3194b3c3899a62191e654990b6e3393b410667102284)',
  await clusters.getTransactionStatus('0xffea3b29c64016772b7d3194b3c3899a62191e654990b6e3393b410667102284'),
);


console.log('getEvents', await clusters.getEvents({ limit: 1, nextPage: 'sAPGZWgLwk' }));

console.log('createCluster', await clusters.createCluster(AUTH_TOKEN));

console.log(
  'getClusterById',
  await clusters.getClusterById('0xa8d12b92b91fe0db3651ff2d45c1f47b1bb343054e9cd1e556c73f2330269224'),
);

console.log(
  'getClusterIdByAddress',
  await clusters.getClusterIdByAddress('0x5cff9c1362a71247da33887be2a44ac36a8724bb'),
);

console.log(
  'addWallets',
  await clusters.addWallets(
    [{ address: '0x0000000000000000000000000000000000000011', name: 'new', isPrivate: true }],
    AUTH_TOKEN,
  ),
);

console.log(
  'updateWalletNames',
  await clusters.updateWalletNames(
    [{ address: '0x0000000000000000000000000000000000000011', name: 'new2' }],
    AUTH_TOKEN,
  ),
);

console.log('removeWallets', await clusters.removeWallets(['0x0000000000000000000000000000000000000011'], AUTH_TOKEN));

console.log('verifyWallet', await clusters.verifyWallet('0x5cff9c1362a71247da33887be2a44ac36a8724bb', AUTH_TOKEN));

console.log('-- utils --');

console.log('getImageUrl("clusters")', getImageUrl('clusters'));
console.log('getProfileUrl("clusters")', getProfileUrl('clusters'));

console.log(isNameValid('abc123'));
console.log(isNameValid('abc_123'));
console.log(isNameValid('abc-123'));
console.log(isNameValid('abc!123')); // Fails
*/
