import React, {useState} from 'react'

const List = React.memo(({id, title, money, budget, setBudget}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedMoney, setEditedMoeny] = useState(money);

    const handleClick = (id) => {
        let newBudget = budget.filter((bud) => bud.id !== id);
        setBudget(newBudget);
        localStorage.setItem('budget', JSON.stringify(newBudget));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newBudget = budget.map(bud => {
            if(bud.id === id) {
                bud.title = editedTitle;
                bud.money = editedMoney;
            }
            return bud;
        })
        setBudget(newBudget);
        localStorage.setItem('budget', JSON.stringify(newBudget));
        setIsEditing(false);
    }

    const handleEditTitleChange = (e) => {
        setEditedTitle(e.target.value);
    }
    
    const handleEditMoenyChange = (e) => {
        setEditedMoeny(e.target.value);
    }

    if (isEditing) {
        return (
            <div className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded bg-gray-100`}> 
            <div className="items-center">
                <form className=" flex items-center justify-between" onSubmit={handleSubmit}> 
                    <input
                    value={editedTitle}
                    onChange={handleEditTitleChange}
                    className='w-48 py-2 mr-12 text-gray-500 bg-gray-100 font-bold' />
                    <input
                    value={editedMoney}
                    onChange={handleEditMoenyChange}
                    className='w-48 py-2 mr-4 text-gray-500 bg-gray-100 font-bold'/>
                    </form>
                </div>
                <div className="items-center">
                    <button className="float-right px-4 py-2" onClick={() => setIsEditing(true)}>X</button>
                    <button onClick={handleSubmit} className="float-right px-4 py-2" type="submit">SAVE</button>
                </div>
          
          </div>
          )
    } else {
          return (
            <div key={id}
            className='flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded hover:border-double hover:border-lime-400'> 
            <div className="flex items-center justify-between">
                <p className='w-60'>{title}</p>
                <p className='w-48'>{money}</p>
              </div>
            <div className="items-center">
            <button className="float-right px-4 py-2" onClick={() => handleClick(id)}>X</button>
            <button className="float-right px-4 py-2" onClick={()=> setIsEditing(true)}>EDIT</button>
            </div>
            </div>
          )
    }
})

export default List