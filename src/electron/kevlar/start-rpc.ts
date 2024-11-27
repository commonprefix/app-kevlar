import { Chain } from '@ethereumjs/common';
import { startServer } from '@lightclients/patronum';
import { ClientManager } from '@lightclients/kevlar';
import { ClientType } from './constants.js';
import {
  defaultBeaconAPIURL,
  defaultProvers,
  defaultPublicRPC,
} from './constants.js';

const getDefaultRPC = (network: number): string => {
  const rpc = defaultPublicRPC[network];
  return rpc[Math.floor(Math.random() * rpc.length)];
};

async function main() {
  try {
    const network = Chain.Mainnet;
    const port = 8546;
    const clientType = ClientType.optimistic;
    const proverURLs = defaultProvers[clientType][network];
    const beaconAPIURL = defaultBeaconAPIURL[network];
    const providerURL = getDefaultRPC(network);

    const cm = new ClientManager(
      network,
      clientType,
      beaconAPIURL,
      providerURL,
      proverURLs,
    );
    const provider = await cm.sync();
    await startServer(provider, port);
  } catch (err) {
    console.error(err);
  }
}

main();
