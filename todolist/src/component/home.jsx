import React, { useState,useEffect } from 'react';
import '../App.css';
import { Outlet, Link } from "react-router-dom";
import listData from '../data/list'; 


function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ err: false, msg: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage({ err: false, msg: "" });
    if (!name || !date || !description) {
      setMessage({ err: true, msg: "Vui lòng điền thông tin!" });
      return;
     
    }
      const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const inputDate = new Date(date);
    if (inputDate <= yesterday) {
      setMessage({ err: true, msg: "Không được nhập ngày hôm qua!" });
      return;
    }
    const newItem = {
      name: name,
      description: description,
      date: date,
      status:false,
    };
    await listData.addList(newItem);
    setName("");
    setDescription("");
    setDate("");
    
    Swal.fire({
      title: "Thêm thành công!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    
    });
    
  };
 
  return (
    <div style={{ marginTop:'50px'}}> 
 
      <h1>Công việc của tôi</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Công việc</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên công việc!"
            />
           {message.err && !name && <div  className="error-message">{message.msg}</div>}
          </div>
  
          <div className="todo-input-item">
            <label>Mô Tả</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả!"
            /> 
                {message.err && !description && <div  className="error-message">{message.msg}</div>}
          </div>
          <div className="todo-input-item">
            <label>Ngày</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
       {message.err && !date && <div  className="error-message">{message.msg}</div>}
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAdd} className="primaryBtn">
              Thêm
            </button>
          </div>
        </div>
        <div style={{display:'flex'}}>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <Link style={{ textDecoration:'none'}} to={`/`}><button class="nav-link active btn btn-secondary" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"  style={{color:'white'}}>  Danh Sách</button></Link>
          </li>
          <li class="nav-item" role="presentation">
          <Link style={{ textDecoration:'none'}} to={`/complete`}> <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"  style={{color:'white'}}>Đã Hoàn Thành</button></Link>
          </li>
        </ul>
        </div>
        <Outlet/>
      </div>
    </div>
  );
}

export default Home;
