// connectors.ts
import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { Connector, Web3ReactStore } from "@web3-react/types";
import { Phantom, PhantomConstructorArgs } from "web3-react-phantom";

interface ExtendedPhantomConstructorArgs extends PhantomConstructorArgs {
  network?: string;
}

const phantom = initializeConnector<Phantom>(
  (actions) =>
    new Phantom({
      actions,
      network: "devnet",
    } as ExtendedPhantomConstructorArgs)
);

const connectors: [Connector, Web3ReactHooks, Web3ReactStore][] = [phantom];

export default connectors;
