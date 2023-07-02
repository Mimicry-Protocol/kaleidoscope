import { Kaleidoscope } from '../dist/index.js';
import 'dotenv/config';

(async () => {
    try {
        const globalConfig = {
            dataProviders: {
                // fungibleTokens: {
                //     dia: process.env.DIA_KEY
                // },
                nfts: {
                    dia: true,
                    nftBank: process.env.NFTBANK_KEY,
                    reservoir: process.env.RESERVOIR_KEY,
                    // coinGecko: true,
                    coinGeckoPro: process.env.COINGECKO_KEY,
                    nftGo: process.env.NFTGO_KEY,
                },
            },
            verbose: true,
        };
        
        const kaleidoscope = new Kaleidoscope(globalConfig);
        
        const hvMtlFloor = await kaleidoscope.nftCollection.getFloor({
            address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        }, {
            filter: "mad",
            method: "mean",
        });
        console.log(hvMtlFloor);
        console.log(hvMtlFloor.sources);

        // const hvMtlMeta = await kaleidoscope.nftCollection.getMetadata({
        //     address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        // }, 'reservoir');
        // console.log(hvMtlMeta);

        // const hvMtlFloorChart = await kaleidoscope.nftCollection.getFloorChart({
        //     address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        // }, 'coinGeckoPro');
        // console.log(hvMtlFloorChart.data.floor_price_native);
        // console.log(hvMtlFloorChart.data.h24_volume_native);

        // const y00tsFloor = await kaleidoscope.nftCollection.getFloor({
        //     address: '0x670fd103b1a08628e9557cd66b87ded841115190',
        //     chain: 'polygon',
        // });
        // const hvMtlMetadata = await kaleidoscope.nftCollection.getMetadata({
        //     address: '0x4b15a9c28034dC83db40CD810001427d3BD7163D',
        //     chain: 'ethereum',
        // });
        
    } catch (error) {
        console.error(error.message);
    }    
})();