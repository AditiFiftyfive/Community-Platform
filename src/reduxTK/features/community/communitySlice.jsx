// reduxTK/features/community/communitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkCreatorPermissions } from "../../../pages/CommunityDashboard/hooks/useCommunityDashboard";

const API_URL = "http://localhost:5000/Communities";

// Thunk to fetch all communities
export const fetchCommunities = createAsyncThunk(
  "communities/fetchAll",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

const communitySlice = createSlice({
  name: "communities",
  initialState: { 
    items: [],       // all communities
    loading: false, 
    error: null
  },
  reducers: {
    addCommunity: (state, action) => {
      state.items.push(action.payload);
    },
    removeCommunity: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Note: We do not compute hasCreatedCommunity here
        // Use the selector in components for a dynamic check
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Selector: get communities created by the current user
export const selectUserCommunities = (state, currentUser) => {
  if (!state.communities.items || !currentUser) return [];
  return state.communities.items.filter(c =>
    checkCreatorPermissions(c, currentUser).isCreator
  );
};

// Export actions and reducer
export const { addCommunity, removeCommunity } = communitySlice.actions;
export default communitySlice.reducer;
