import { Kaleidoscope } from '../dist/index.js';
import 'dotenv/config';

try {
    const config = {
        dataProviders: {
            fungibleTokens: {
                dia: process.env.DIA_KEY
            },
            nonFungibleTokens: {
                dia: process.env.DIA_KEY
            },
        }
    };
    const kaleidoscope = new Kaleidoscope(config);
} catch (error) {
    console.log(error);
}
