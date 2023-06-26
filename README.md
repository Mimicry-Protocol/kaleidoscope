# Kaleidoscope
Kaleidoscope is an NPM package that aggregates multiple data providers for safely querying metrics for use within NFT prediction markets. 

## Benefits
The main benefit of Kaleidoscope is that it drastically reduces the risks related to:
- price manipulation by a closed-source data provider
- data provider down-time

## Technical Architecture
Kaleidoscope leverages a factory pattern where any NFT data provider can be added to this package as long as it adhears to a certain interface. In this way, all someone needs to do to query data from multiple providers is simply provide API keys for each desired provider.
