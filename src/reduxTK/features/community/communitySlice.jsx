import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { slugify } from "../../../utils/slugify";


const API_URL = "http://localhost:5000/Communities";

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
    items: [],       
    loading: false,
    error: null
  },
  reducers: {
    addCommunity: (state, action) => {
      const { community, currentUser } = action.payload;

      state.items.push({
        ...community,
        coverImage: community.coverImage instanceof File
          ? URL.createObjectURL(community.coverImage)
          : community.coverImage || null,

        profileImage: community.profileImage instanceof File
          ? URL.createObjectURL(community.profileImage)
          : community.profileImage || null,

        slug: community.slug || slugify(community.communityName || community.name || ""),
        createdBy: currentUser?.id,
        creatorEmail: currentUser?.email,
        builder: currentUser?.name || currentUser?.username,
      });
    },
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

export const { addCommunity, removeCommunity, updateCommunity, clearCommunities } =
  communitySlice.actions;
export default communitySlice.reducer;
