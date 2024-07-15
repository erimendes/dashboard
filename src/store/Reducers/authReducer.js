import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCedentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});

export const logout = createAsyncThunk(
  'auth/logout',
  async({navigate,role},{rejectWithValue, fulfillWithValue}) => {

    console.log("chegou aqui")

      try {
          const {data} = await api.get('/logout', {withCredentials: true}) 
          localStorage.removeItem('accessToken',data.token) 
          if (role === 'admin') {
              navigate('/admin/login')
          } else {
              navigate('/login')
          }
          return fulfillWithValue(data)
      } catch (error) {
          // console.log(error.response.data)
          return rejectWithValue(error.response.data)
      }
  }
)


export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
