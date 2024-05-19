import React, { useState, useEffect } from 'react';
import '../App.css';
import listData from '../data/list'; 

function ListComplete() {
  const [completedList, setCompletedList] = useState([]);

  const getList = async () => {
    try {
      const data = await listData.getListComplete(true); 
      console.log(data);
      setCompletedList(data); 
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    getList(); 
  }, []);

  const deleteListt = async (id) => {
    await listData.deleteList(id);
    getList();
    Swal.fire({
      title: "Xóa Thành Công!",
      icon: "success"
    });
  };
 
  return (  
    <>
          <div>
        {completedList.map((item, index) => (
          <div key={index} className="card" style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#444444', boxShadow: '2px 2px #999999' }}>
            <div className="card-body">
              <h4 className="card-title" style={{ color: 'green' }}>{item.name}</h4>
              <p className="card-text" style={{ color: 'white' }}> {item.description}</p>
              <p className="card-text" style={{ color: 'white' }}>Đã Hoàn Thành Công Việc Của Ngày: {item.date}</p>
            </div>
            <div>
              <span onClick={() => deleteListt(item.id)}><ion-icon className="trash" name="trash-outline" > </ion-icon></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListComplete;
