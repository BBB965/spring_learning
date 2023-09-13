import React, {useState} from "react";
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists'

const initialBudget = localStorage.getItem("budget") ? JSON.parse(localStorage.getItem("budget")) :[];

function App() {

  const [budget, setBudget] = useState(initialBudget);
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "" || amount === "") 
    {
      
    } else {

    let newBudget = {
      id : Date.now(),
      title: value,
      money: amount,
    };
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
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-green-100'>
      <div className="w-full md:max-w-2xl lg:w-3/4 lg:max-w-2xl">
      <div className='flex px-6 mb-3'>
        <h1 className='text-2xl'>예산 계산기</h1>
      </div>
      <div className='w-full p-6 bg-white rounded shadow '>
        <Form value={value} setValue={setValue} amount={amount} setAmount={setAmount} handleSubmit={handleSubmit}/>
        <Lists budget={budget} setBudget={setBudget}/>
      </div>
      <div className="flex p-6 justify-between">
        <button onClick={handleRemoveClick} className="border px-3 py-2 rounded bg-gray-600 text-white">목록 지우기</button>
        <p>sdfsdfd</p>
      </div>
      </div>
    </div>
  )
}

export default App;
