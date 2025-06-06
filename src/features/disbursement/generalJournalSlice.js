import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for initial development
const mockGeneralJournals = [
  {
    id: 1,
    date: '2024-03-20',
    reference: 'GJ-001',
    particulars: 'Monthly Rent Payment',
    accountCode: '1-01-01-010',
    debit: 50000.00,
    credit: 0.00,
    status: 'Posted',
    postedBy: 'John Smith',
    postedDate: '2024-03-20T10:30:00',
  },
  // Add more mock data as needed
];

const initialState = {
  generalJournals: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchGeneralJournals = createAsyncThunk(
  'generalJournal/fetchGeneralJournals',
  async (filters, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await api.get('/api/general-journals', { params: filters });
      // return response.data;
      
      // Simulate API call with mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockGeneralJournals);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const exportGeneralJournals = createAsyncThunk(
  'generalJournal/exportGeneralJournals',
  async (filters, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await api.get('/api/general-journals/export', { params: filters });
      // return response.data;
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: 'Export successful' });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const generalJournalSlice = createSlice({
  name: 'generalJournal',
  initialState,
  reducers: {
    resetGeneralJournalState: (state) => {
      state.generalJournals = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch general journals
      .addCase(fetchGeneralJournals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGeneralJournals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.generalJournals = action.payload;
      })
      .addCase(fetchGeneralJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Export general journals
      .addCase(exportGeneralJournals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(exportGeneralJournals.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(exportGeneralJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGeneralJournalState } = generalJournalSlice.actions;

export default generalJournalSlice.reducer; 