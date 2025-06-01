import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employer from '@/configs/employer'
import { getCookie, setCookie } from 'cookies-next'
import toast from '@/helpers/toast'
import { USER } from '@/types/user'
import { ENUMS } from '@/enums'
import ModulesApi from '@/api/moduleApi'

const employerCookie = getCookie(employer.EMPLOYER)
const initialState = {
  info: employerCookie && typeof employerCookie === 'string' ? JSON.parse(employerCookie) : {},
  configs: {},
  units: [],
  isLoad: false,
  status: 'idle',
  theme: "light",
  errors: {},
  error: null,
  isValidate: false,
}

export const fetchUser = createAsyncThunk('employer/fetchUser', async (device) => {
  const { authApi } = ModulesApi()
  authApi.setDefault()
  const resp = await authApi.detail({ device: device })
  return resp
})


export const employerUpdate = createAsyncThunk('employer/employerUpdate', async (data: USER, thunkAPI) => {
  const param = { 
    ...data,
    device: getCookie(employer.DEVICE), 
  }
  const { authApi } = ModulesApi()
  const resp: any = await authApi.update(param)
  if (resp.status == ENUMS.SUCCESS) {
    toast.success(resp.data.message)
  } else {
    toast.error(resp.data.message)
    return thunkAPI.rejectWithValue(resp)
  }
})

const employerStore = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.info = action.payload.user
      if(action.payload.configs) {
        state.configs = action.payload.configs
        localStorage.setItem(employer.CONFIGS, JSON.stringify(action.payload.configs))
      }
      if(action.payload.units) {
        state.units = action.payload.units
        localStorage.setItem(employer.UNITS, JSON.stringify(action.payload.units))
      }
    },
    setIsValidate(state, action) {
      state.isValidate = action.payload.validate
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    setThemeState(state, action) {
      state.theme = action.payload
      setCookie("theme", action.payload)
    },
  },
  extraReducers: {
    [fetchUser.pending.toString()]: (state: any, action: any) => {
      state.isLoading = true
    },
    [fetchUser.fulfilled.toString()]: (state: any, action: any) => {
      state.isLoading = false
      state.info = action.payload.data.data.user
      state.configs = action.payload.data.data.configs
      setCookie(employer.EMPLOYER, JSON.stringify(action.payload.data.data.user))
    },
    [employerUpdate.rejected.toString()]: (state: any, action: any) => {
      state.errors = action.payload.data.errors
    }
  }
})

// export const { getInfo } = employerStore.actions
export const { setAuthState, setThemeState, setIsValidate, setTheme } = employerStore.actions

export default employerStore.reducer

