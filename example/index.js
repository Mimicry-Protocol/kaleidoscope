import { Kaleidoscope } from '../dist/index.js';
import 'dotenv/config';

(async () => {
    try {
        const config = {
            dataProviders: {
                // fungibleTokens: {
                //     dia: process.env.DIA_KEY
                // },
                nonFungibleTokens: {
                    dia: process.env.DIA_KEY,
                    nftBank: process.env.NFTBANK_KEY,
                },
            },
            verbose: false,
        };
        const kaleidoscope = new Kaleidoscope(config);
        const floor = await kaleidoscope.nftCollection.getFloor({
            address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        });
        console.log(floor);
    } catch (error) {
        console.log(error);
    }    
})();