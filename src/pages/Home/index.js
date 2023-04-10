import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants";

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

const app = {
  maxWidth: "1040px",
  margin: "auto",
  padding: "30px 20px 50px",
  background: "#fff",
  borderRadius: "5px",
  border: "1px solid #d9d9d9",
  boxShadow: "rgb(54 62 81 / 10%) 0px 1px 2px 1px",
};

// const Home = () => {
//   return <div style={app}>
//     <Edit/>
//     <List />
//   </div>
// }

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const { data } = await res.json();
  setData(data);
}
async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({data})
  });
}
const Home = () => {
  //頁面是靜態的，不會被React渲染，所以不能直接用變數
  // Let a=100
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);
  // const [data1, setData1] = useState([]);

  // function plus (){
  //   setA(function  (prev){
  //     return prev + 200
  //   })
  // }
  useEffect(() => {
    if(!submittingStatus.current) return;
    fetchSetData(data)
    .then(data => submittingStatus.current = false);
  }, [data]);

  useEffect(() => {
    fetchData(setData);
  }, []);
  // useEffect(()=>{

  //   console.log('data:', data);
  //   console.log('data1:', data1);
  // }, [data, data1]);
  //仿生命週期
  // useEffect(()=>{

  //   // //綁定的事情
  //   // return () => {
  //   //   //取消綁定
  //   // };
  //   // window.alert('新增成功');

  // }, [/*data*/]);

  return (
    <div className="app" style={app}>
      <Edit add={setData} submittingStatus={submittingStatus}/>
      <List listData={data} deleteData={setData}  submittingStatus={submittingStatus}/>
    </div>
  );
};
export default Home;
