import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducer: {
    changeName(state) {
      state.name = "park";
    },
    increase(state) {
      state.age += 1;
    }
  }
});

export let { changeName, increase } = user.actions;

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ]
});

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  }
});
