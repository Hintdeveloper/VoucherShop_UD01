import { AxiosInstance } from 'axios';
import { createAxiosInstance } from './utils/axios';
import { createClient } from '@supabase/supabase-js';





//Declare URL and key
//Gameshift
const GAME_SHIFT_URL = 'https://api.gameshift.dev/nx';
const COLLECTION_ID = "b1318df5-7ee5-491e-9157-1fc59bf6b202"
// const CLIENT_COLLECTION_ID = "1a607e13-7388-4df5-ad3b-a00826258a9c"

//Supabase
const SUPABASE_URL = 'https://urlvurzbkwpnwemuykbp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybHZ1cnpia3dwbndlbXV5a2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0MzY5NzEsImV4cCI6MjAzODAxMjk3MX0.SQinsYRiyhrsnFKX8_X_eahTx6VtFZIqc0P364owD34'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class GameShiftService {
    private axiosGameShift: AxiosInstance;
    fetchVoucherlists: any;

    constructor() {
        this.axiosGameShift = createAxiosInstance(GAME_SHIFT_URL, {
            'x-api-key':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIzYTM5ZThhNS02NmJjLTQxZTEtODM1NC02N2ZjN2MzNzliYzEiLCJzdWIiOiJhODdiMjU1YS1iNjhkLTQ5MTAtYTMwYi1mN2I5Y2QxZTM5M2QiLCJpYXQiOjE3MjI1Njk4MjV9.vg7rMaD6okcgpmdPdRDn3JZklm_AiprKmB3IK9o_YmY',
        });
    }

    async createUser(email: string) {
        return await this.axiosGameShift.post(GAME_SHIFT_URL + '/users', {
            email,
            referenceId: email,
        });
    }

    async CreateVoucher(referenceId: string, voucherName: string, imageFile: File, descriptionUser: string) {
        // Đặt đường dẫn nơi bạn muốn lưu ảnh trong Supabase bucket
        const filePath = `public/${imageFile.name}`;

        // Kiểm tra xem file đã tồn tại trong bucket chưa
        const { data: listData, error: listError } = await supabase.storage.from('ImageBucket').list('public', {
            search: imageFile.name,
        });

        let imageURL: string;

        if (listError) {
            throw new Error(`Lỗi khi kiểm tra file: ${listError.message}`);
        }

        if (listData && listData.length > 0) {
            // File đã tồn tại, lấy URL của file
            const { data: urlData } = supabase.storage.from('ImageBucket').getPublicUrl(filePath);
            imageURL = urlData.publicUrl;
        } else {
            // File chưa tồn tại, tiến hành upload
            const { data: uploadData, error: uploadError } = await supabase.storage.from('ImageBucket').upload(filePath, imageFile);

            if (uploadError) {
                throw new Error(`Không thể tải ảnh lên: ${uploadError.message}`);
            }

            // Lấy URL công khai của ảnh vừa tải lên
            const { data: urlData } = supabase.storage.from('ImageBucket').getPublicUrl(filePath);
            imageURL = urlData.publicUrl;
        } const data = {
            details: {
                collectionId: COLLECTION_ID,
                description: descriptionUser,
                imageUrl: imageURL,
                name: voucherName,
            },
            destinationUserReferenceId: referenceId,
        };

        return await this.axiosGameShift.post(GAME_SHIFT_URL + '/unique-assets',
            data
        );
    }
    async BuyVoucher(referenceId: string, walletAddress: string, itemID: string) {

        // const data = {
        //     details: {
        //         collectionId: CLIENT_COLLECTION_ID,
        //         description: "This is a voucher",
        //         imageUrl: 'https://urlvurzbkwpnwemuykbp.supabase.co/storage/v1/object/public/ImageBucket/pngwing.com.png?t=2024-07-31T14%3A44%3A37.537Z',
        //         name: voucherName,
        //         attributes: [
        //             {
        //                 traitType: 'price',
        //                 value: price.toString(),
        //             },
        //         ],
        //     },
        //     destinationUserReferenceId: referenceId,
        // };

        // const createNft = await this.axiosGameShift.post(GAME_SHIFT_URL + '/unique-assets',
        //     data
        // );
        // console.log(createNft.data.id)
        // const idnewNft = createNft.data.id;


        const transferNft = await this.axiosGameShift.post(GAME_SHIFT_URL + `/users/${referenceId}/items/${itemID}/transfer`, {
            destinationWallet: walletAddress,
            quantity: '1',
        });
        const URLConfirm = transferNft.data.consentUrl;
        console.log(typeof (URLConfirm));


        const { data } = await supabase.from("email_confirmation").insert({ emailURL: URLConfirm }).select()//ko cần phải chạy id đâu, toi dể identity 1 1 r nó tự tăng
        console.log("insert: ", data)
        if (data !== null) {
            window.open(data[0].emailURL)
            await supabase.from('email_confirmation').update({ status: true }).eq('emailURL', data[0].emailURL)
            await supabase.from('email_confirmation').delete().eq('status', true)
        }
    }

    async fetchVoucherlist(referenceId: string) {
        const params = {
            collectionId: COLLECTION_ID
        }
        return await this.axiosGameShift.get(GAME_SHIFT_URL + `/items?ownerReferenceId=${referenceId}`);
    }

    // async fetchBoughtVoucherlist() {

    //     const params = {
    //         collectionId: CLIENT_COLLECTION_ID
    //     }
    //     return await this.axiosGameShift.get(GAME_SHIFT_URL + '/items',

    //     );
    // }


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
