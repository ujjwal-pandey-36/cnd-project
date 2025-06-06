import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for initial development
const mockDisbursementJournals = [
  {
    id: 1,
    municipality: 'Sample Municipality',
    funds: 'General Fund',
    date: '2024-03-20',
    checkNo: 'CHK-001',
    voucherNo: 'DV-001',
    jevNo: 'JEV-001',
    claimant: 'John Doe',
    particulars: 'Office Supplies',
    accountCode: '1-01-01-010',
    debit: 5000.00,
    credit: 0.00,
    approver: 'Jane Smith',
    position: 'Department Head',
    startDate: '2024-03-01',
    endDate: '2024-03-31'
  },
  // Add more mock data as needed
];

const initialState = {
  disbursementJournals: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDisbursementJournals = createAsyncThunk(
  'disbursementJournal/fetchDisbursementJournals',
  async (filters, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await api.get('/api/disbursement-journals', { params: filters });
      // return response.data;
      
      // Simulate API call with mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockDisbursementJournals);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const exportDisbursementJournals = createAsyncThunk(
  'disbursementJournal/exportDisbursementJournals',
  async (filters, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      // const response = await api.get('/api/disbursement-journals/export', { params: filters });
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

const disbursementJournalSlice = createSlice({
  name: 'disbursementJournal',
  initialState,
  reducers: {
    resetDisbursementJournalState: (state) => {
      state.disbursementJournals = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch disbursement journals
      .addCase(fetchDisbursementJournals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDisbursementJournals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.disbursementJournals = action.payload;
      })
      .addCase(fetchDisbursementJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Export disbursement journals
      .addCase(exportDisbursementJournals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(exportDisbursementJournals.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(exportDisbursementJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDisbursementJournalState } = disbursementJournalSlice.actions;

export default disbursementJournalSlice.reducer; 