import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gameshiftService from '../gameshift.service';

export function CreateVoucherForm() {
  // const dispatch = useDispatch();
  // const selector = useSelector(getState);
  const [nameVoucher, setNameVoucher] = useState("");
  const [priceVoucher, setPriceVoucher] = useState(0);
  const email = "hientranle1209@gmail.com";

  const router = useNavigate();

  const handleSubmit = () => {
    // const newVoucher = {
    //   id: selector.length + 1,
    //   name: nameVoucher,
    //   price: priceVoucher,
    // };
    // console.log(newVoucher);
    // dispatch(actionAdd(newVoucher));

    try {
      const res = gameshiftService.CreateVoucher(priceVoucher, email, nameVoucher);
      console.log('res: ', res);
      alert('Voucher created successfully!');
    } catch (error) {
      console.log('error: ', error);
      alert('Something happened, please try again');
    };
  }
  
    return (
      <form>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">Voucher name:</label>
          <input
            type="text"
            name="name"
            value={nameVoucher}
            onChange={(e) => setNameVoucher(e.target.value)}
            required
            style={{ width: "300px", height: "40px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={priceVoucher}
            onChange={(e) => setPriceVoucher(parseInt(e.target.value))}
            required
            style={{ width: "300px", height: "40px" }}
          />
        </div>
        <Link to="/list">
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "300px",
              height: "40px",
              backgroundColor: "red",
              marginTop: "10px",
            }}
          >
            + Add
          </button>
        </Link>
      </form>
    );
  }

