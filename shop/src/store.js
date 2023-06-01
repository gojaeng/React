import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice.js'

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state,action){
        let 번호 = state.findIndex((a)=>{return a.id == action.payload})
        state[번호].count++
    },
    addItem(state, action){
        state.push(action.payload)
    }
  }
});

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  }
});
export let {changeCount, addItem} = cart.actions
