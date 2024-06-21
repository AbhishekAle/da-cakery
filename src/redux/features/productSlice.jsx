import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";

//get all products list
export const productsList = createAsyncThunk(
  "/product/list",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.listProducts();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all products by product_category
export const productsCategory = createAsyncThunk(
  "/product/category",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.categoryProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get all popular Products
export const productPopular = createAsyncThunk(
  "/product/popular",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.popularProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get view all products by category related products

export const productRelated = createAsyncThunk(
  "/product/related",
  async (category_slug, { rejectWithValue }) => {
    try {
      const response = await api.relatedProducts(category_slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//product details
export const productsDetails = createAsyncThunk(
  "/product/details",
  async (prod_slug, { rejectWithValue }) => {
    // Update the parameter
    try {
      const response = await api.detailsProducts(prod_slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get products flavour
export const productsFlavours = createAsyncThunk(
  "/product/flavours",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getProductFlavours();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    popularProducts: [],
    categoryProducts: [],
    relatedProducts: [],
    recommendedProduct: [],
    flavours: [],
    product: null,
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
      .addCase(productsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(productsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.recommendedProduct = action.payload.recommendedProduct;
      })
      .addCase(productsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productPopular.pending, (state) => {
        state.loading = true;
      })
      .addCase(productPopular.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProducts = action.payload.data;
      })
      .addCase(productPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productsCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload.data;
      })

      .addCase(productsCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productRelated.pending, (state) => {
        state.loading = true;
      })

      .addCase(productRelated.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.data;
      })

      .addCase(productRelated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(productsFlavours.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsFlavours.fulfilled, (state, action) => {
        state.loading = false;
        state.flavours = action.payload.data;
      })
      .addCase(productsFlavours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
