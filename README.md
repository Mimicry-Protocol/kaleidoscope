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

## Supported Data Providers

### NFT Collection Data Providers

| | `Floor (ETH)` | `Floor (POLYGON)` | `Floor (SOLANA)` |
|--|:--:|:--:|:--:|
| DAI       | yes | no | no |
| NFTBank   | yes | no | no |
| Reservoir | yes | no | no |


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

### Adding a New Provider

To add a new provider, you need to do the following:
1. Clone a worker of the same type as the provider you wish to add. For example, if you wish to add a new NFT Collection Data Provider, clone `./src/lib/kaleidoscope/vendors/dataProviders/nftCollection/workers/NftBank.ts`.
2. Rename the cloned file and Class name to match the name of the provider you wish to add.
3. Update the docs comment and the `apiHost` at the top of the file.
4. Update the comments above each function to match the provider's API.
5. Update the `uri` and `options` within each method to match the provider's API.
6. Update the response parsing logic within each method to match the provider's API.
7. Update the `getBlockchain` method as needed to match the provider's API.
8. Update the `getName()` function to return the human-readable name of the provider.
9. Add the provider's API_KEY to `./example/.env.example`.
10. Add the provider's API_KEY to `.example/index.js`, along with a new `key`
11. Add the new `key` to the `addDataProvider` method in the appropriate Factory class.
12. Test the provider by running `node index.js` in the `./example` directory.
13. Update the README.md to include the new provider in the list of supported providers.



## MVP Roadmap
- [x] support Chain: ethereum NFTs
- [x] support Currency: ETH
- [x] support Metric: Floor Price
- [x] support Consensus Filter: None
- [x] support Consensus Method: Median
- [x] support Provider: DIA
- [x] support Retry strategy with exponential backoff
- [x] support Provider: NFTBank
- [x] support Provider: Reservoir
- [ ] support Provider: CoinGecko
- [ ] support for providers failing to return a response

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