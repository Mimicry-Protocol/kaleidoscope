import { Kaleidoscope } from '../dist/index.js';
import 'dotenv/config';

(async () => {
    try {
        /**
         * Global configuration for the Kaleidoscope instance
         */
        const globalConfig = {
            dataProviders: {
                fungibleTokens: {
                    dia: process.env.DIA_KEY
                },
                nfts: {
                    dia: true,
                    nftBank: process.env.NFTBANK_KEY,
                    reservoir: process.env.RESERVOIR_KEY,
                    nftGo: process.env.NFTGO_KEY,
                    coinGeckoPro: process.env.COINGECKO_KEY,
                    // coinGecko: true,
                },
            },
            verbose: true,
        };
        
        /**
         * Setups the Kaleidoscope instance
         */
        const kaleidoscope = new Kaleidoscope(globalConfig);
        
        /**
         * Get the floor of a collection
         * Default values shown for illustration purposes
         */
        const hvMtlFloor = await kaleidoscope.nftCollection.getFloor({
            chain: 'ethereum',  // default
            address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        }, {
            filter: "none",     // default
            method: "median",   // default
        });
        console.log(hvMtlFloor);

        /**
         * Get the floor of a collection on a specific chain
         * While in __DEV__ mode you will see errors for the 
         * data providers that do not support a given chain.
         */
        const y00tsFloor = await kaleidoscope.nftCollection.getFloor({
            address: '0x670fd103b1a08628e9557cd66b87ded841115190',
            chain: 'polygon',
        });
        console.log(y00tsFloor);

        /**
         * Get the metadata of a collection
         */
        const hvMtlMeta = await kaleidoscope.nftCollection.getMetadata({
            address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        }, 'reservoir');
        console.log(hvMtlMeta);

        /**
         * Get the floor chart of a collection
         */
        const baycFloorChart = await kaleidoscope.nftCollection.getFloorChart({
            address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        }, 'coinGeckoPro', '1d');
        console.log(baycFloorChart.data.iochlv[0]);

    } catch (error) {
        console.error(error.message);
    }    
})();