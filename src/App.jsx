import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from './features/auth/authSlice';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Settings pages
import DepartmentPage from './pages/settings/DepartmentPage';
import SubdepartmentPage from './pages/settings/SubdepartmentPage';
import UserPage from './pages/settings/UserPage';
import ChartOfAccountsPage from './pages/settings/ChartOfAccountsPage';
import VendorPage from './pages/settings/VendorPage';
import EmployeePage from './pages/settings/EmployeePage';
import LocationPage from './pages/settings/LocationPage';
import PPEPage from './pages/settings/PPE/PPEPage';
import ApprovalMatrixPage from './pages/settings/ApprovalMatrixPage';
import BankPage from './pages/settings/BankPage';
import DocumentDetailsPage from './pages/settings/DocumentDetailsPage';
import ItemPage from './pages/settings/ItemPage';
import InvoiceChargeAccountsPage from './pages/settings/InvoiceChargeAccountsPage';
import ItemUnitPage from './pages/settings/ItemUnitPage';
import ProjectTypePage from './pages/settings/ProjectTypePage';
import FinancialStatementPage from './pages/settings/FinancialStatementPage';
import FiscalYearPage from './pages/settings/FiscalYearPage';
import TaxCodePage from './pages/settings/TaxCodePage';
import ModeOfPaymentPage from './pages/settings/ModeOfPaymentPage';
import PaymentTermsPage from './pages/settings/PaymentTermsPage';
import IndustryPage from './pages/settings/IndustryPage';
import ProjectDetailsPage from './pages/settings/ProjectDetailsPage';

// Disbursement pages
import ObligationRequestPage from './pages/disbursement/ObligationRequestPage';
import DisbursementVoucherPage from './pages/disbursement/DisbursementVoucherPage';
import TravelOrderPage from './pages/disbursement/TravelOrderPage';
import JournalEntryPage from './pages/disbursement/JournalEntryPage';
import DisbursementJournalPage from './pages/disbursement/DisbursementJournalPage';
import GeneralJournalPage from './pages/disbursement/GeneralJournalPage';
import BeginningBalancePage from './pages/settings/BeginningBalance/BeginningBalancePage';
import PurchaseRequestPage from './pages/disbursement/PurchaseRequestPage';
import FundUtilizationRequestPage from './pages/fund-utilization/FundUtilizationRequestPage';

// Collections pages
import GeneralReceiptPage from './pages/collections/GeneralReceiptPage';
import CommunityTaxPage from './pages/collections/CommunityTaxPage';
import RealPropertyTaxPage from './pages/collections/RealPropertyTaxPage';
import MarketCollectionsPage from './pages/collections/MarketCollectionsPage';

// Budget pages
import AnnualBudgetPage from './pages/budget/AnnualBudgetPage';
import AllotmentPage from './pages/budget/AllotmentPage';
import FundsPage from './pages/budget/FundsPage';
import BudgetTransferPage from './pages/budget/BudgetTransferPage';
import BudgetDetailsPage from './pages/budget/BudgetDetailsPage';

// Applications pages
import BusinessPermitPage from './pages/applications/BusinessPermitPage';
import ChequeGeneratorPage from './pages/applications/ChequeGeneratorPage';

// Reports pages
import GeneralLedgerPage from './pages/reports/GeneralLedgerPage';
import FinancialStatementsPage from './pages/reports/FinancialStatementsPage';
import BudgetReportPage from './pages/reports/BudgetReportPage';
import BirReportPage from './pages/reports/BirReportPage';

function App() {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAuthLayout, setIsAuthLayout] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in via token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if the current route is part of the AuthLayout
    const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
    setIsAuthLayout(authRoutes.includes(location.pathname));
  }, [location.pathname]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegistrationPage />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPasswordPage />} />
        <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/" replace /> : <ResetPasswordPage />} />
      </Route>

      {/* Dashboard Layout Routes (Protected) */}
      <Route element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<DashboardPage />} />
        
        {/* Settings module */}
        <Route path="/settings/departments" element={<DepartmentPage />} />
        <Route path="/settings/subdepartments" element={<SubdepartmentPage />} />
        <Route path="/settings/users" element={<UserPage />} />
        <Route path="/settings/chart-of-accounts" element={<ChartOfAccountsPage />} />
        <Route path="/settings/vendors" element={<VendorPage />} />
        <Route path="/settings/employees" element={<EmployeePage />} />
        <Route path="/settings/locations" element={<LocationPage />} />
        <Route path="/settings/ppe" element={<PPEPage />} />
        <Route path="/settings/approval-matrix" element={<ApprovalMatrixPage />} />
        <Route path="/settings/bank" element={<BankPage />} />
        <Route path="/settings/document-details" element={<DocumentDetailsPage />} />
        <Route path="/settings/items" element={<ItemPage />} />
        <Route path="/settings/items/invoice-charge-accounts" element={<InvoiceChargeAccountsPage />} />
        <Route path="/settings/items/units" element={<ItemUnitPage />} />
        <Route path="/settings/project-type" element={<ProjectTypePage />} />
        <Route path="/settings/financial-statement" element={<FinancialStatementPage />} />
        <Route path="/settings/fiscal-year" element={<FiscalYearPage />} />
        <Route path="/settings/tax-code" element={<TaxCodePage />} />
        <Route path="/settings/mode-of-payment" element={<ModeOfPaymentPage />} />
        <Route path="/settings/payment-terms" element={<PaymentTermsPage />} />
        <Route path="/settings/industry" element={<IndustryPage />} />
        <Route path="/settings/project-details" element={<ProjectDetailsPage />} />
        
        {/* Disbursement module */}
        <Route path="/disbursement/obligation-requests" element={<ObligationRequestPage />} />
        <Route path="/disbursement/vouchers" element={<DisbursementVoucherPage />} />
        <Route path="/disbursement/travel-orders" element={<TravelOrderPage />} />
        <Route path="/disbursement/journal-entries" element={<JournalEntryPage />} />
        <Route path="/disbursement/disbursement-journals" element={<DisbursementJournalPage />} />
        <Route path="/disbursement/general-journals" element={<GeneralJournalPage />} />
        <Route path="/disbursement/beginning-balance" element={<BeginningBalancePage />} />
        <Route path="/disbursement/purchase-requests" element={<PurchaseRequestPage />} />
        <Route path="/disbursement/fund-utilization-requests" element={<FundUtilizationRequestPage />} />
        
        {/* Collections module */}
        <Route path="/collections/receipts" element={<GeneralReceiptPage />} />
        <Route path="/collections/community-tax" element={<CommunityTaxPage />} />
        <Route path="/collections/real-property-tax" element={<RealPropertyTaxPage />} />
        <Route path="/collections/market" element={<MarketCollectionsPage />} />
        
        {/* Budget module */}
        <Route path="/budget/annual" element={<AnnualBudgetPage />} />
        <Route path="/budget/allotments" element={<AllotmentPage />} />
        <Route path="/budget/funds" element={<FundsPage />} />
        <Route path="/budget/transfers" element={<BudgetTransferPage />} />
        <Route path="/budget/details" element={<BudgetDetailsPage />} />
        
        {/* Applications module */}
        <Route path="/applications/business-permits" element={<BusinessPermitPage />} />
        <Route path="/applications/cheque-generator" element={<ChequeGeneratorPage />} />
        
        {/* Reports module */}
        <Route path="/reports/general-ledger" element={<GeneralLedgerPage />} />
        <Route path="/reports/financial-statements" element={<FinancialStatementsPage />} />
        <Route path="/reports/budget" element={<BudgetReportPage />} />
        <Route path="/reports/bir" element={<BirReportPage />} />
      </Route>
      
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;