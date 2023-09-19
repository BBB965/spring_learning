import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: 'cart',
    initialState :[],
    reducers: {
        insertItem(state, action) {
            console.log(state);
            console.log(action);
            let num = state.findIndex((obj) => {
                return obj.id === action.payload.id;
            });
            if (num === -1) {
                state.push(action.payload);
                console.log(state);
            } else {
                state[num].count += action.payload.count;
            }
            console.log(state.data);
            console.log(state.cart);
        },
        deleteItem(state, action) {
            let num = state.findIndex((obj) => {
                return obj.id === action.payload;
            });
            state.splice(num, 1);
        },
        increaseCount(state, action) {
            let num = state.findIndex((obj) => {
                return obj.id === action.payload;
            });
            state[num].count += 1;
        },
        decreaseCount(state, action) {
            let num = state.findIndex((obj) => {
                return obj.id === action.payload;
            });
            state[num].count -= 1;
        },
        checkedChange(state, action) {
            let num = state.findIndex((obj)=> {
                return obj.id === action.payload;
            });
            state[num].checked = !state[num].checked;
        },
        allCheckedTrue(state, action) {
            state.forEach((obj) => {
                obj.checked = true;
            })
        },
        allCheckedFalse(state,action) {
            state.forEach((obj) => {
                obj.checked = false;
            })
        }
    },
});

export let { insertItem, deleteItem, increaseCount, decreaseCount, checkedChange, allCheckedFalse, allCheckedTrue} = cart.actions;

export default cart;