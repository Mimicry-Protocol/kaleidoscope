<p align="center">
  <a href="https://mimicry.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Mimicry-Protocol/brand-assets/main/animated-logos/Gifs/Web-Res/Circles/Mimicry_logo-color-black_circle_bg-animated.gif">
      <img src="https://raw.githubusercontent.com/Mimicry-Protocol/brand-assets/main/animated-logos/Gifs/Web-Res/Circles/Mimicry_logo-color-black_circle_bg-animated.gif" height="128">
    </picture>
    <h1 align="center">Kaleidoscope Node SDK</h1>
    <h3 align="center">Maintained by Mimicry</h3>
  </a>
</p>
<p align="center">
  <a aria-label="License" href="LICENSE">
    <img src="https://badgen.net/badge/license/GPLv3/pink">
  </a>&nbsp;
  <a aria-label="Size Test" href="https://github.com/Mimicry-Protocol/kaleidoscope/actions/workflows/size.yml">
    <img alt="" src="https://github.com/Mimicry-Protocol/kaleidoscope/actions/workflows/size.yml/badge.svg">
  </a>&nbsp;
  <a aria-label="CI Test" href="https://github.com/Mimicry-Protocol/kaleidoscope/actions/workflows/main.yml">
    <img alt="" src="https://github.com/Mimicry-Protocol/kaleidoscope/actions/workflows/main.yml/badge.svg">
  </a>
</p>


Kaleidoscope is an NPM package that conveniently aggregates responses from multiple NFT data providers. The intended audience is application developers who wish to integrate fraud-resistant price data into their apps. The main benefit of Kaleidoscope is that it drastically reduces the risks related to price manipulation by closed-source data providers, and data provider down-time.


## Installation
Run `yarn add @mimicry/kaleidoscope@latest` to install the module.

## Setup
The module allows developers to instantiate an instance in a few lines of code. For example:
```typescript
import { Kaleidoscope } from "@mimicry/kaleidoscope";
import 'dotenv/config';

const config = {
  dataProviders: {
    nfts: {
      dia: process.env.DIA_KEY
      , reservoir: process.env.RESERVOIR_KEY
      , nftgo: process.env.NFTGO_KEY
      , coingecko: process.env.COINGECKO_KEY
      , center: process.env.CENTER_KEY
      , nefertiti: process.env.NEFERTITI_KEY
      , gallop: process.env.GALLOP_KEY
      , nftbank: process.env.NFTBANK_KEY
      , zash: process.env.ZASH_KEY
      , hellomoon: process.env.HELLOMOON_KEY
    },
    fungibleTokens: {
      coingecko: process.env.COINGECKO_KEY
    }
  }
};
const kaleidoscope = new Kaleidoscope(config);
```

## Usage
Kaleidoscope provides a number of methods to interact with the providers. See [`./example/`](https://github.com/Mimicry-Protocol/kaleidoscope/blob/main/example/) for a full example.

Here is a summary of the methods available:
```typescript
// Get available chains
const chains: string[] = await kaleidoscope.getChains();

// Get available consensus methods
const consensusMethods: string[] = await kaleidoscope.getConsensusMethods();

// Get available providers
const providers: string[] = await kaleidoscope.getProviders();

// Get available currencies
const currencies: string[] = await kaleidoscope.getCurrencies();

// Get available metrics
const metrics: string[] = await kaleidoscope.getMetrics();

// Get available timeframes
const timeframes: string[] = await kaleidoscope.getTimeframes();

// Get the value from a config object
const value: bigint = await kaleidoscope.getValueFromConfig({
    collection: "0x4b15a9...",                  // required
    chain: chains.ETHEREUM,                     // optional, ETHEREUM is the default
    metric: metrics.FLOOR_PRICE,                // optional, FLOOR_PRICE is the default
    consensusMethod: consensusMethods.MEDIAN,   // optional, MEDIAN is the default
    currency: currencies.NATIVE,                // optional, NATIVE is the default
    providers: [providers.ALL]                  // optional, ALL is the default
});

// Sets the global configs and get the value
const floor: bigint = await kaleidoscope
    .setChain(chains.POLYGON)                       // optional, ETHEREUM is the default
    .setMetric(metrics.MARKET_CAP)                  // optional, FLOOR_PRICE is the default
    .setConsensusMethod(consensusMethods.AVERAGE)   // optional, MEDIAN is the default    
    .setCurrency(currencies.USD)                    // optional, NATIVE is the default
    .setProviders([providers.NFT_GO])               // optional, ALL is the default
    .getValue('0x1234...');                         // required

// Return the current config settings
const configSettings: any = await kaleidoscope.getSettings();

const candles: any[] = await kaleidoscope.getCandles({
    collection: "0x4b15a9...",                  // required
    chain: chains.ETHEREUM,                     // optional, ETHEREUM is the default
    metric: metrics.FLOOR_PRICE,                // optional, FLOOR_PRICE is the default
    consensusMethod: consensusMethods.MEDIAN,   // optional, MEDIAN is the default
    currenecy: currencies.NATIVE,               // optional, NATIVE is the default
    providers: [providers.ALL]                  // optional, ALL is the default
    timeframe: timeframes.ONE_DAY,              // optional, ONE_DAY is the default
});
```

## For Contributors

To run TSDX, use:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

- Use `yarn build` to do a one-off build.
- Use `yarn analyize` to fix linting issues, run tests, and check distribution size.
- Use `yarn publish` to publish to NPM. Note there is a weird quirk where you need to commit and sync the `package.json` version number at the start of the process, before entering the NPM 2FA code. Otherwise, the version number will be out of sync with the published package.


## MVP Roadmap
- [ ] support Chain: ethereum NFTs
- [ ] support Provider: DIA
- [ ] support Provider: NFTBank
- [ ] support Provider: Reservoir
- [ ] support Provider: CoinGecko
- [ ] support Metric: Floor Price
- [ ] support Currency: ETH
- [ ] support Consensus Method: Median
- [ ] support getCandles() method, 1d timeframe

## Backlog
- [ ] support Chain: polygon NFTs
- [ ] support Chain: solana NFTs
- [ ] support Currency: MATIC
- [ ] support Currency: SOL

- [ ] support Provider: HelloMoon
- [ ] support Provider: Center
- [ ] support Provider: Zash
- [ ] support Provider: NFTGo
- [ ] support Provider: Nefertiti
- [ ] support Provider: Gallop

- [ ] support Currency: USD
- [ ] support Metric: Market Cap
- [ ] support Consensus Method: MAD_Mean