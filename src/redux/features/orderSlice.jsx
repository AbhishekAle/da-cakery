import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//create Order
export const addOrder = createAsyncThunk(
  "/order/add",
  async ({ order, navigate, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.createOrder(order);
      toast.success(response.data.message || "create order successFully!");
      navigate("/payment/success");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//get all products list
export const orderList = createAsyncThunk(
  "/order/list",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.orderList();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//single order
export const OrderSingleDetail = createAsyncThunk(
  "/order/single/details",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.singleOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//getAllDistricts
export const ordersDistrict = createAsyncThunk(
  "/orders/district",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getDistrict();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//add shippingDetails
export const shippingAdd = createAsyncThunk(
  "/shipping/add",
  async ({ shippingValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addShippingDetails(shippingValue);
      toast.success(response.data.message || "add new shippingInfo!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//getShippingDetails

export const allShippingDetails = createAsyncThunk(
  "/get/shippingInfo",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getShippingDetails();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    districts: [],
    shippings: [],
    shipping: null,
    order: null,
    loading: false,
    error: "",
    message: "",
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderList.pending, (state) => {
        state.pending = true;
      })

      .addCase(orderList.fulfilled, (state, action) => {
        state.pending = false;
        state.orders = action.payload.data;
      })
      .addCase(orderList.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload.message;
      })
      .addCase(addOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(OrderSingleDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(OrderSingleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(OrderSingleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(ordersDistrict.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(ordersDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload.data;
      })
      .addCase(ordersDistrict.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.msg;
      })
      .addCase(shippingAdd.pending, (state) => {
        state.loading = true;
      })
      .addCase(shippingAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload;
      })
      .addCase(shippingAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allShippingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(allShippingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.shippings = action.payload.data;
      })
      .addCase(allShippingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
