import { Kaleidoscope } from '../dist/index.js';
import 'dotenv/config';

(async () => {
    try {
        const globalConfig = {
            dataProviders: {
                // fungibleTokens: {
                //     dia: process.env.DIA_KEY
                // },
                nonFungibleTokens: {
                    dia: process.env.DIA_KEY,
                    nftBank: process.env.NFTBANK_KEY,
                    reservoir: { 
                        apiKey: process.env.RESERVOIR_KEY,
                    },
                    // coinGecko: { 
                    //     apiKey: process.env.COINGECKO_KEY,
                    //     host: 'https://pro-api.coingecko.com/api/v3/',
                    // }
                },
            },
            verbose: true,
        };
        const kaleidoscope = new Kaleidoscope(globalConfig);
        const hvMtlFloor = await kaleidoscope.nftCollection.getFloor({
            address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        });
        const y00tsFloor = await kaleidoscope.nftCollection.getFloor({
            address: '0x670fd103b1a08628e9557cd66b87ded841115190',
            chain: 'polygon',
        });
        console.log(y00tsFloor);
        console.log(y00tsFloor.sources);
    } catch (error) {
        console.error(error);
    }    
})();