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
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  }
})

export const { setChannelInfo, setServerInfo } = appSlice.actions;

export const selectSeverId = state => state.app.serverId;
export const selectServerName = state => state.app.serverName;
export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;

export default appSlice.reducer;
