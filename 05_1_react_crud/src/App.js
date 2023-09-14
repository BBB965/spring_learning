import React, {useState, useMemo} from "react";
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialBudget = localStorage.getItem("budget") ? JSON.parse(localStorage.getItem("budget")) :[];

function sumBudget(budget) {
  let totalAmount = 0;
  budget.forEach((bud) => {
    totalAmount += bud.money;
  })
  return totalAmount;
}

function App() {

  const [budget, setBudget] = useState(initialBudget);
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState();
  
  const totalBudget = useMemo(() => sumBudget(budget),[budget]);

  const error = (s) => toast.error(s);
  const success = (s) => toast.success(s);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "" || amount === "") 
    {
      if (value === "" && amount === "") error("지출항목과 비용을 입력해주세요!");
      else if (value === "") error("지출항목을 입력해주세요!");
      else if (amount === "") error("비용을 입력해주세요!");

    } else {

    let newBudget = {
      id : Date.now(),
      title: value,
      money: parseInt(amount),
    };
    success("예산이 추가되었습니다!");
    setBudget(prev => [...prev, newBudget]);
    localStorage.setItem("budget" , JSON.stringify(...budget, newBudget));
    setValue("");
    setAmount("");
  }
  }

  const handleRemoveClick = () => {
    setBudget([]);
    localStorage.setItem("budget", JSON.stringify([]));
  }

  return (
    <div>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        limit={1}
      />
    
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-green-100'>
      <div className="w-full md:max-w-2xl lg:w-3/4 lg:max-w-2xl">
      <div className='flex px-6 mb-3'>
        <h1 className='text-2xl'>예산 계산기</h1>
      </div>
      <div className='w-full p-6 bg-white rounded shadow '>
        <Form value={value} setValue={setValue} amount={amount} setAmount={setAmount} handleSubmit={handleSubmit}/>
        <Lists budget={budget} setBudget={setBudget} success={success}/>
      </div>
      <div className="flex p-6 justify-between">
        <button onClick={handleRemoveClick} className="border px-3 py-2 rounded bg-gray-600 text-white">목록 지우기</button>
        <p className="bg-white border rounded px-3 py-2 font-semibold">총 예산 : {totalBudget} 원</p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default App;
