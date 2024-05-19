import React, { useState, useEffect } from 'react';
import '../App.css';
import listData from '../data/list'; 

function List() {
  const [list, setList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [modalContent, setModalContent] = useState({ name: "", description: "", date: "" }); 

  const getList = async () => {
    try {
      const data = await listData.getAllList();
      setList(data);
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

  const handleCheck = async (id) => {
    try {
      const itemToMove = list.find(item => item.id === id);
      await listData.updateList(id, { ...itemToMove, status: true });
      const updatedList = await listData.getAllList();
      setList(updatedList);
      const completedItems = updatedList.filter(item => item.status === true);
      setCompletedList(completedItems);
      Swal.fire({
        title: " Đã hoàn thành công việc!",
        icon: "success"
      });
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      Swal.fire({ 
        title: "Đã xảy ra lỗi khi cập nhật trạng thái!",
        icon: "error"
      });
    }
  };
  
  
  const handleUpdate = async (id) => {
    const itemToMove = list.find(item => item.id === id);
    setModalContent(itemToMove);
    console.log(itemToMove)
  }

  const update = async (id) => {
    try {
      await listData.updateList(id, modalContent); 
      Swal.fire({
        title: "Cập nhật thành công!",
        icon: "success"
      });
      getList();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      Swal.fire({ 
        title: "Đã xảy ra lỗi khi cập nhật!",
        icon: "error"
      });
    }
  };
 
  
  return (    
    <>
      <div>
        {list.map((item, index) => (
          <div key={index} className="card" style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#444444', boxShadow: '2px 2px #999999' }}>
            <div className="card-body">
              <h4 className="card-title" style={{ color: 'red' }}>{item.name}</h4>
              <p className="card-text" style={{ color: 'white' }}> {item.description}</p>
              <p className="card-text" style={{ color: 'white' }}>Ngày thực hiện: {item.date}</p>
            </div>
            <div>
              <ion-icon name="checkmark-outline" onClick={() => handleCheck(item.id)}></ion-icon>
              <span onClick={(e)=>deleteListt(item.id)}><ion-icon className="trash" name="trash-outline" > </ion-icon></span>
              <ion-icon className="checkmark" name="create-outline" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> handleUpdate(item.id)}></ion-icon>
            </div>
          </div>
        ))}
      </div>
      
       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color:'red'}}>Cập nhật</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="todo-input">
                <div className="todo-input-item">
                  <label style={{ color:'#666666'}}>Công việc</label>
                  <input
                    type="text"
                    value={modalContent.name}
                    onChange={(e) => setModalContent({ ...modalContent, name: e.target.value })}
                    placeholder="Nhập tên công việc!"
                  />
               
                  <label style={{ color:'#666666'}}>Mô Tả</label>
                  <input
                    type="text"
                    value={modalContent.description}
                    onChange={(e) => setModalContent({ ...modalContent, description: e.target.value })}
                    placeholder="Nhập mô tả!"
                  />
                
                  <label style={{ color:'#666666'}}>Ngày</label>
                  <input
                    type="date"
                    value={modalContent.date}
                    onChange={(e) => setModalContent({ ...modalContent, date: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={() => update(modalContent.id)} data-bs-dismiss="modal">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default List;
