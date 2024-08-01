import { AxiosInstance } from 'axios';
import { createAxiosInstance } from './utils/axios';
import { createClient } from '@supabase/supabase-js';





//Declare URL and key
//Gameshift
const GAME_SHIFT_URL = 'https://api.gameshift.dev/nx';
const COLLECTION_ID = "0a6c5a8b-375c-4e58-a19d-6c250c69b3cc"
const CLIENT_COLLECTION_ID = "1a607e13-7388-4df5-ad3b-a00826258a9c"

//Supabase
const SUPABASE_URL ='https://urlvurzbkwpnwemuykbp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybHZ1cnpia3dwbndlbXV5a2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0MzY5NzEsImV4cCI6MjAzODAxMjk3MX0.SQinsYRiyhrsnFKX8_X_eahTx6VtFZIqc0P364owD34'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class GameShiftService {
    private axiosGameShift: AxiosInstance;
    fetchVoucherlists: any;

    constructor() {
        this.axiosGameShift = createAxiosInstance(GAME_SHIFT_URL, {
            'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJiZjJiODlkMC0xODdmLTQwN2UtODAzMi1mM2YyMzhkODFmNTYiLCJzdWIiOiJmNTIxMTcxOC0xYjdiLTRkM2YtYjhiOS1hODVjMjQ0ZDBiOGMiLCJpYXQiOjE3MjIzMjg2MDV9.MMC-7pLrQo5Yu6SknGvQsqDeoV5kKJwnetESGLLYOn4',
        });
    }

    // async createUser(email: string) {
    //     return await this.axiosGameShift.post(GAME_SHIFT_URL + '/users', {
    //         email,
    //         referenceId: email,
    //     });
    // }

    async CreateVoucher(price: number, referenceId: string, voucherName: string) {

        const data = {
            details: {
                collectionId: COLLECTION_ID,
                description: "This is a voucher",
                imageUrl: 'https://urlvurzbkwpnwemuykbp.supabase.co/storage/v1/object/public/ImageBucket/pngwing.com.png?t=2024-07-31T14%3A44%3A37.537Z',
                name: voucherName,
                attributes: [
                    {
                        traitType: 'price',
                        value: price.toString(),
                    },
                ],
            },
            destinationUserReferenceId: referenceId,
        };

        return await this.axiosGameShift.post(GAME_SHIFT_URL + '/unique-assets',
            data
        );
    }
    async BuyVoucher(price: number, referenceId: string, walletAddress: string, voucherName: string) {

        const data = {
            details: {
                collectionId: CLIENT_COLLECTION_ID,
                description: "A list of voucher",
                name: voucherName,
                attributes: [
                    {
                        traitType: 'price',
                        value: price.toString(),
                    },
                ],
            },
            destinationUserReferenceId: referenceId,
        };

        const createNft = await this.axiosGameShift.post(GAME_SHIFT_URL + '/unique-assets',
            data
        );

        const idnewNft = createNft.data.item.id;

        const transferNft = await this.axiosGameShift.post(GAME_SHIFT_URL + `/users/${referenceId}/items/${idnewNft}/transfer`, {
            destinationWallet: walletAddress,
            quantity: '1',
        });

        const URLConfirm = transferNft.data.consentUrl;

        //

        const { error } = await supabase
            .from('email_confirmation')
            .insert({ id: 1, url: URLConfirm})
    }

    async fetchVoucherlist() {
        const params = {
            collectionId: COLLECTION_ID
        }
        return await this.axiosGameShift.get(GAME_SHIFT_URL + '/items');     
    }

    async fetchBoughtVoucherlist() {

        const params = {
            collectionId: CLIENT_COLLECTION_ID
        }
        return await this.axiosGameShift.get(GAME_SHIFT_URL + '/items',

        );
    }


    async fetchUser(referenceId: string) {

        const params = {
            referenceId
        }
        return await this.axiosGameShift.get(
            GAME_SHIFT_URL + `/users/${referenceId}`
        );
    }

    async fetchUserWallet(referenceId: string) {

        return await this.axiosGameShift.get(
            GAME_SHIFT_URL + `/users/${referenceId}/wallet-address`
        );
    }
}

export default new GameShiftService();