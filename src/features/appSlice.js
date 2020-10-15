import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    serverId: null,
    serverName: null,
    channelId: null,
    channelName: null,
  },
  reducers: {
    setServerId: (state, action) => {
      state.app += action.payload;
    },
    setChannelId: (state, action) => {
      state.app += action.payload;
    },
  }
})

export const { setChannelId } = appSlice.actions;

export const selectSeverId = state => state.app.serverId;
export const selectServerName = state => state.app.serverName;
export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;

export default appSlice.reducer;
