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
    nonFungibleTokens: {
      dia: process.env.DIA_KEY
    }
  }
};
const kaleidoscope = new Kaleidoscope(config);
```

## Usage
Kaleidoscope provides a number of methods to interact with the providers. See [`./example/`](https://github.com/Mimicry-Protocol/kaleidoscope/blob/main/example/) for a full example.

Here is a summary of the methods available:
```typescript

const floorInfo: bigint = await kaleidoscope.nftCollection.getFloor({
    address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
});
console.log(floorInfo);

// {
//   currencyInfo: { symbol: 'ETH', name: 'Ethereum', decimals: 18 },
//   amount: { atomic: 510000000000000000n, decimal: 0.51 }
// }
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
- [x] support Chain: ethereum NFTs
- [x] support Currency: ETH
- [x] support Metric: Floor Price
- [x] support Consensus Filter: None
- [x] support Consensus Method: Median
- [x] support Provider: DIA
- [ ] support Retry straetgy with exponential backoff
- [ ] support Provider: NFTBank
- [ ] support Provider: Reservoir
- [ ] support Provider: CoinGecko

## Backlog
- [ ] support getCandles() method, 1d timeframe
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
- [ ] support Consensus Filter: Mean Absolute Deviation
- [ ] support getPrice for fungible tokens