import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";
import Cookies from "js-cookie";

//register
export const register = createAsyncThunk(
  "/auth/register",
  async ({ registerValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.userRegister(registerValue);
      toast.success(response.data.message || "register successfully!");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//login
export const login = createAsyncThunk(
  "/auth/login",
  async ({ loginValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.userLogin(loginValue);
      toast.success(response.data.message || "login successfully!");

      if (response.data.user.is_admin) {
        // Redirect to the admin dashboard for admin users
        navigate("/admin/da-bakery/dashboard-panel");
      } else {
        // Redirect to the profile page for non-admin users
        navigate("/");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//get single logged user;
export const profile = createAsyncThunk(
  "/auth/profile",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.userProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//change Password
export const changePassword = createAsyncThunk(
  "/auth/change/password",
  async (
    { changePasswordValue, navigate, toast },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.updatePassword(changePasswordValue);
      toast.success(response.data.message || "Password changed successfully!");
      dispatch(setLogout());
      dispatch(clearUser()); // Dispatch the clearUser action
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//forgot password
export const passwordForgot = createAsyncThunk(
  "/auth/forget/password",
  async ({ forgotValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword(forgotValue);
      toast.success(response.data.message || "verify to your email!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//reset password
export const passwordReset = createAsyncThunk(
  "/auth/password/reset",
  async ({ uid, token, resetValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.resetPassword(uid, token, resetValue);
      toast.success(response.data.message || "password reset successfully!");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//change profile
export const profileUpdate = createAsyncThunk(
  "/auth/profile/Update",
  async ({ updateForm, toast }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.updateProfile(updateForm);
      toast.success(response.data.message || "profile update successfully!");
      dispatch(profile()); // Dispatch profile action to fetch updated profile data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [],
    isAuthenticated: false,
    loading: false,
    isLoading: false,
    message: "",
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      Cookies.remove("token");
      state.user = null;
      state.isAuthenticated = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.token.access;

        // Set the token in a cookie
        Cookies.set("token", accessToken, { secure: true, sameSite: "strict" });

        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.loading = false;
      //   localStorage.setItem("token", action.payload.token.access);
      //   state.isAuthenticated = true;
      //   state.user = action.payload.user;
      // })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(passwordForgot.pending, (state) => {
        state.loading = true;
      })
      .addCase(passwordForgot.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(passwordForgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(passwordReset.pending, (state) => {
        state.loading = true;
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(profileUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearError, setLogout, clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;
