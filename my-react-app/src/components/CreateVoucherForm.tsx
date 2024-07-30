import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getState } from "./redux/slices/VoucherSlices";
import { actionAdd } from "./redux/slices/VoucherSlices";
import { Link } from "react-router-dom";

export default function CreateVoucherForm() {
  const dispatch = useDispatch();
  const selector = useSelector(getState);
  const [nameVoucher, setNameVoucher] = useState("");
  const [priceVoucher, setPriceVoucher] = useState(0);
  const handleSubmit = () => {
    const newVoucher = {
      id: selector.length + 1,
      name: nameVoucher,
      price: priceVoucher,
    };
    console.log(newVoucher);
    dispatch(actionAdd(newVoucher));
  };
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
      <Link to="/">
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
