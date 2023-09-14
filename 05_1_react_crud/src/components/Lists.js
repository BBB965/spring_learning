import React from 'react'
import List from './List';

const Lists = React.memo(({budget, setBudget, success}) => {
  return (
    <div>
        {budget.map((bud) => (
            <List
                key = {bud.id}
                id = {bud.id}
                title = {bud.title}
                money = {bud.money}
                budget = {budget}
                setBudget = {setBudget}
                success = {success}
            />
        ))}
    </div>
  )
})

export default Lists