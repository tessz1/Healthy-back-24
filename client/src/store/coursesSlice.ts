import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  description: string;
  
  price: number;
  duration: string;
  instructor: string;
  imageUrls: string[];
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Course[]>(`${import.meta.env.VITE_API_URL}/api/courses`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка при загрузке курсов");
  }
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coursesSlice.reducer;

