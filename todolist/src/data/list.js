import { db } from "./data";
import { collection, getDocs,deleteDoc,doc,updateDoc,getDoc,addDoc,where,query } from "firebase/firestore";

const listCollectionRef = collection(db, "list");

class ListData {
    getAllList = async () => {
        try {
            const q = query(listCollectionRef, where("status", "==", false));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return list;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }
    deleteList=(id)=>{
        const listDoc=doc(db,"list",id);
        return deleteDoc(listDoc);
    }
    addList=(newList)=>{
        return addDoc(listCollectionRef, newList);
    }

    updateList=(id,updatedList )=>{
        const listDoc=doc(db,"list",id);
        return updateDoc(listDoc, updatedList);
    }
    getList=(id)=>{
        const listDoc=doc(db,"list",id);
        return getDoc(listDoc);
    }
    // getAllList7= async () => {
    //     try {
    //         const currentDate = new Date();
    //         const futureDate = new Date(currentDate);
    //         futureDate.setDate(currentDate.getDate() + 7);
            
    //         const currentDateString = currentDate.toISOString().split('T')[0];
    //         const futureDateString = futureDate.toISOString().split('T')[0];
            
    //         const dateCondition1 = where("date", ">=", currentDateString);
    //         const dateCondition2 = where("date", "<=", futureDateString);
    //         const statusCondition = where("status", "==", false);

    //         const q = query(
    //             listCollectionRef,
    //             dateCondition1,
    //             dateCondition2,
    //             statusCondition
    //         );
    //         const querySnapshot = await getDocs(q);
    //         const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //         return list;
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         throw error;
    //     }
    // }
    
    getListComplete = async (status) => {
        try {
            const q = query(listCollectionRef, where("status", "==", status));
            const querySnapshot = await getDocs(q);
            const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return list;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; 
        }
    }
    
    
}

export default new ListData();
