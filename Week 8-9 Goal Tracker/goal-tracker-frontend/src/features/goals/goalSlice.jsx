import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// Thunks
export const fetchGoals = createAsyncThunk(
    "goals/fetchAll",
    async (_, thunkAPI) => {
        try {
            return await goalService.getGoals();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addGoal = createAsyncThunk(
    "goals/add",
    async (goalData, thunkAPI) => {
        try {
            return await goalService.createGoal(goalData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateGoal = createAsyncThunk(
    "goals/update",
    async ({ id, goalData }, thunkAPI) => {
        try {
            return await goalService.updateGoal(id, goalData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeGoal = createAsyncThunk(
    "goals/delete",
    async (id, thunkAPI) => {
        try {
            await goalService.deleteGoal(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice
const goalSlice = createSlice({
    name: "goals",
    initialState: {
        goals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.goals.unshift(action.payload);
            })
            .addCase(removeGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter((goal) => goal._id !== action.payload);
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                const index = state.goals.findIndex((g) => g._id === action.payload._id);
                if (index !== -1) state.goals[index] = action.payload;
            });

    },
});

export default goalSlice.reducer;
