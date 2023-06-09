import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ICampaign, IWeb3Slice } from '../models/web3Models';

const initialState: IWeb3Slice = {
  campaigns: null,
  campaign: null,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setCampaign: (state, action: PayloadAction<ICampaign>) => {
      state.campaign = action.payload;
    },
    setCampaigns: (state, action: PayloadAction<ICampaign[]>) => {
      state.campaigns = action.payload;
    },

    resetWeb3State: (_) => initialState,
  },
});

const web3Reducer = web3Slice.reducer;

export const { setCampaign, setCampaigns, resetWeb3State } = web3Slice.actions;

export const selectCampaign = (state: RootState): ICampaign | null =>
  state.web3.campaign;
export const selectCampaigns = (state: RootState): ICampaign[] | null =>
  state.web3.campaigns;

export { web3Reducer };
