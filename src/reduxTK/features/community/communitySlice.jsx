// reduxTK/features/community/communitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { slugify } from "../../../utils/slugify";


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
  name: "communities", // must match the key in store
  initialState: {
    items: [],       // all communities
    loading: false,
    error: null
  },
  reducers: {
    addCommunity: (state, action) => {
      const c = action.payload;
      state.items.push({
        ...c,
        slug: c.slug || slugify(c.communityName || c.name || "")
      });
    },
    removeCommunity: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    updateCommunity: (state, action) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    clearCommunities: (state) => {
      state.items = [];
      state.error = null;
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
        state.items = action.payload.map(c => ({
          ...c,
          slug: c.slug || slugify(c.communityName || c.name || "")
        }));
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// ✅ Selectors
// Communities created by the current user
export const selectUserCommunities = (state, currentUser) => {
  if (!state.communities?.items || !currentUser) return [];

  return state.communities.items.filter((community) => {
    return (
      community.builder === currentUser.name ||
      community.builder === currentUser.username ||
      community.createdBy === currentUser.id ||
      community.userId === currentUser.id ||
      currentUser.id === community.createdBy ||
      currentUser.id === community.userId
    );
  });
};

// Check if current user has created any community
export const selectHasCreatedCommunity = (state, currentUser) => {
  const userCommunities = selectUserCommunities(state, currentUser);
  return userCommunities.length > 0;
};

// Export actions and reducer
export const { addCommunity, removeCommunity, updateCommunity, clearCommunities } =
  communitySlice.actions;
export default communitySlice.reducer;
