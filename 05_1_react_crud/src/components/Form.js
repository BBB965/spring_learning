import React from 'react'

export default function Form({value, setValue, amount, setAmount, handleSubmit}) {
    
    const handleValueChange = (e) => {
        setValue(e.target.value);
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex pt-2 justify-between">
            <div className='flex justify-between'>
                <div>
                    <p className='mb-2 text-green-900 font-semibold'>
                        지출 항목
                    </p>
                    <input
                        onChange={handleValueChange}
                        type="text"
                        name="value"
                        className='w-64 px-3 py-2 mr-4 text-gray-500 border rounded shadow'
                        value={value}
                    />
                </div>
                <div>
                    <p className='mb-2 text-green-900 font-semibold'>
                        비용
                    </p>
                    <input
                        onChange={handleAmountChange}
                        type="number"
                        name="amount"
                        className='w-64 px-3 py-2 mr-4 text-gray-500 border rounded shadow'
                        value={amount}
                    />
                </div>
            </div>
            <input
                className='px-2 mt-8 text-green-900 border-2 font-smibold border-green-900 rounded hover:text-white hover:bg-green-700'
                type="submit"
                value="예산 추가"
            />
        </form>
    </div>
  )
}
