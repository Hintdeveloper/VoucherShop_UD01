import { AxiosInstance } from 'axios';
import { createAxiosInstance } from './utils/axios';

const GAME_SHIFT_URL = 'https://api.gameshift.dev/nx';
const COLLECTION_ID = "0a6c5a8b-375c-4e58-a19d-6c250c69b3cc"
const CLIENT_COLLECTION_ID = "1a607e13-7388-4df5-ad3b-a00826258a9c"


class GameShiftService {
    private axiosGameShift: AxiosInstance;

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
                imageUrl: 'https://crossmint.myfilebase.com/ipfs/QmaVK4z7RFM3PFLRWh3CSvUc9BpYCm9RCysN7uFMYh7ctG',
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
    },
    async BuyVoucher(price: number, referenceId: string, walletAddress?: string) {

        const data = {
            details: {
                collectionId: CLIENT_COLLECTION_ID,
                description: "A list of voucher",
                imageUrl: 'https://crossmint.myfilebase.com/ipfs/QmaVK4z7RFM3PFLRWh3CSvUc9BpYCm9RCysN7uFMYh7ctG',
                name: 'Voucher List',
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

        const tranferNft = await this.axiosGameShift.post(GAME_SHIFT_URL + `/users/${referenceId}/items/${idnewNft}/transfer`, {
            destinationWallet: walletAddress,
            quantity: '1',
        });

        const URLConfirm = tranferNft.data.consentUrl;

        //

        const { error } = await supabase
            .from('tranfer_transaction')
            .insert({ id: 1, url: URLConfirm, status: 'true' })
    }

    async fetchVoucherlist() {

        const params = {
            collectionId: COLLECTION_ID
        }
        return await this.axiosGameShift.get(GAME_SHIFT_URL + '/items',

        );
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
