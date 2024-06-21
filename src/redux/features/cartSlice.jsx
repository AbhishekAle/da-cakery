import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//get all items cart
export const allItemsCart = createAsyncThunk(
  "/all/itemsCart",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getCartItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//add items into cart
export const ItemsAddedCart = createAsyncThunk(
  "/add/cart",
  async ({ data, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.addCartItems(data);
      toast.success(response.data.message || "items added to cart!");
      // Dispatch getItemsCart() to fetch updated cart items
      dispatch(allItemsCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete cartItems
export const ItemsDeleteCart = createAsyncThunk(
  "/delete/cart",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCartItems(id);
      toast.success(response.data.message || "items remove successFully!");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all wishList
export const allWhishList = createAsyncThunk(
  "/get/whishList",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getWishList();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//add wishList
export const wishListAdd = createAsyncThunk(
  "/add/wishList",
  async ({ data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.addWishList(data);
      toast.success(response.data.message || "product added to wishList!");
      navigate("/wishlist");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    progressing: false,
    err: "",
    msg: "",
    cartItems: [],
    wishLists: [],
    wishList: {},
    items: [],
    shippingInfo: null,
  },
  reducers: {
    clearErr: (state) => {
      state.err = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },

    incrementItem(state, action) {
      const { prod_slug } = action.payload;

      const cartIndex = state.cartItems.findIndex((cart) =>
        cart.items.some((item) => item.prod_slug === prod_slug)
      );

      if (cartIndex >= 0) {
        const cartItem = state.cartItems[cartIndex];
        const productIndex = cartItem.items.findIndex(
          (item) => item.prod_slug === prod_slug
        );

        if (productIndex >= 0) {
          cartItem.items[productIndex].quantity++;
        }
      }
    },

    decrementItem(state, action) {
      const { prod_slug } = action.payload;
      const cartIndex = state.cartItems.findIndex((cart) =>
        cart.items.some((item) => item.prod_slug === prod_slug)
      );

      if (cartIndex >= 0) {
        const cartItem = state.cartItems[cartIndex];
        const productIndex = cartItem.items.findIndex(
          (item) => item.prod_slug === prod_slug
        );

        if (productIndex >= 0 && cartItem.items[productIndex].quantity > 1) {
          cartItem.items[productIndex].quantity--;
        }
      }
    },

    addShippingInfo(state, action) {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allItemsCart.pending, (state) => {
        state.progressing = true;
      })
      .addCase(allItemsCart.fulfilled, (state, action) => {
        state.progressing = false;
        state.cartItems = action.payload.data;
      })
      .addCase(allItemsCart.rejected, (state, action) => {
        state.progressing = false;
        state.err = action.payload?.msg;
      })
      .addCase(ItemsAddedCart.pending, (state) => {
        state.progressing = true;
      })
      .addCase(ItemsAddedCart.fulfilled, (state, action) => {
        state.progressing = false;
        state.items = action.payload;
      })
      .addCase(ItemsAddedCart.rejected, (state, action) => {
        state.progressing = false;
        state.err = action.payload?.msg;
      })
      .addCase(ItemsDeleteCart.pending, (state) => {
        state.progressing = true;
      })
      .addCase(ItemsDeleteCart.fulfilled, (state, action) => {
        state.progressing = false;

        const {
          arg: { id },
        } = action.meta;
        if (id) {
          // Find the cart that contains the item with the given id
          const cartIndex = state.cartItems.findIndex((cart) =>
            cart.items.some((item) => item.id === id)
          );

          if (cartIndex !== -1) {
            // Filter out the deleted item from the items array of the cart
            state.cartItems[cartIndex].items = state.cartItems[
              cartIndex
            ].items.filter((item) => item.id !== id);
          }
        }
      })
      .addCase(ItemsDeleteCart.rejected, (state, action) => {
        state.progressing = false;
        state.err = action.payload?.msg;
      })
      .addCase(allWhishList.pending, (state) => {
        state.progressing = true;
      })
      .addCase(allWhishList.fulfilled, (state, action) => {
        state.progressing = false;
        state.wishLists = action.payload.data;
      })
      .addCase(allWhishList.rejected, (state, action) => {
        state.progressing = false;
        state.err = action.payload.msg;
      })
      .addCase(wishListAdd.pending, (state) => {
        state.progressing = true;
      })
      .addCase(wishListAdd.fulfilled, (state, action) => {
        state.progressing = false;
        state.wishList = action.payload;
      })
      .addCase(wishListAdd.rejected, (state, action) => {
        state.progressing = false;
        state.err = action.payload.msg;
      });
  },
});

export const {
  clearErr,
  decrementItem,
  incrementItem,
  clearCart,
  addShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
