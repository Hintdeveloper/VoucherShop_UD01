import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gameshiftService from '../gameshift.service';
import './CreateForm.scss'

export function CreateVoucherForm() {
  // const dispatch = useDispatch();
  // const selector = useSelector(getState);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null); // Cập nhật kiểu dữ liệu
  const email = "hientranle1209@gmail.com";

  const router = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

    if (image === null) {
      alert('Please upload an image');
      return;
    }

    try {
      // Gọi hàm CreateVoucher và chờ kết quả
      const res = await gameshiftService.CreateVoucher(email, name, image, description);
      console.log('res: ', res);
      alert('Voucher created successfully!');
      router('/list'); // Điều hướng sau khi thành công
    } catch (error) {
      console.log('error: ', error);
      alert('Something happened, please try again');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", color: "lightgray", fontWeight: "bolder" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "300px", height: "40px" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "lightgray", fontWeight: "bolder" }}>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "300px", height: "40px" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontWeight: "bolder" }}>
        <form className="form">
          <span className="form-title">Upload your file</span>
          <p className="form-paragraph">
            File should be an image
          </p>
          <label className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setImage(file);
              }}
              required
              style={{ width: "300px", height: "40px" }}
            />
          </label>
        </form>
      </div>
      <button
        type="submit"
        style={{
          width: "300px",
          height: "40px",
          backgroundColor: "red",
          marginTop: "10px",
        }}
      >
        + Add
      </button>
    </form>
  );
}

