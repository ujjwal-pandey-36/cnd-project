import * as Yup from 'yup';

// Common validation patterns
const patterns = {
  phone: /^[0-9+\-() ]{7,15}$/,
  tin: /^\d{3}-\d{3}-\d{3}-\d{3}$/,
  sss: /^\d{2}-\d{7}-\d{1}$/,
  philHealth: /^\d{2}-\d{9}-\d{1}$/,
  pagIbig: /^\d{4}-\d{4}-\d{4}$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

// Common validation messages
const messages = {
  required: 'This field is required',
  email: 'Invalid email address',
  phone: 'Invalid phone number format',
  tin: 'Invalid TIN format (e.g., 123-456-789-000)',
  sss: 'Invalid SSS number format (e.g., 12-3456789-0)',
  philHealth: 'Invalid PhilHealth number format (e.g., 12-345678901-2)',
  pagIbig: 'Invalid Pag-IBIG number format (e.g., 1234-5678-9012)',
  positiveNumber: 'Amount must be greater than 0',
  date: 'Invalid date',
  futureDate: 'Date cannot be in the future',
  pastDate: 'Date cannot be in the past',
};

// Journal Entry validation schema
export const journalEntrySchema = Yup.object().shape({
  date: Yup.date()
    .required(messages.required)
    .max(new Date(), messages.futureDate),
  reference: Yup.string()
    .max(50, 'Reference number too long'),
  particulars: Yup.string()
    .required(messages.required)
    .max(500, 'Particulars too long'),
  debitEntries: Yup.array()
    .of(
      Yup.object().shape({
        accountCode: Yup.string().required('Account code is required'),
        amount: Yup.number()
          .required('Amount is required')
          .moreThan(0, messages.positiveNumber),
      })
    )
    .min(1, 'At least one debit entry is required'),
  creditEntries: Yup.array()
    .of(
      Yup.object().shape({
        accountCode: Yup.string().required('Account code is required'),
        amount: Yup.number()
          .required('Amount is required')
          .moreThan(0, messages.positiveNumber),
      })
    )
    .min(1, 'At least one credit entry is required'),
}).test('balancedEntries', 'Total debits must equal total credits', function(values) {
  if (!values.debitEntries || !values.creditEntries) return true;
  
  const totalDebits = values.debitEntries.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
  const totalCredits = values.creditEntries.reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
  
  return Math.abs(totalDebits - totalCredits) < 0.01; // Allow for small floating point differences
});

// Market Collection validation schema
export const marketCollectionSchema = Yup.object().shape({
  date: Yup.date()
    .required(messages.required)
    .max(new Date(), messages.futureDate),
  period: Yup.string()
    .required(messages.required),
  stallNumber: Yup.string()
    .required(messages.required)
    .matches(/^[A-Z]-\d{3}$/, 'Invalid stall number format (e.g., A-101)'),
  stallType: Yup.string()
    .required(messages.required),
  stallOwner: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  amount: Yup.number()
    .required(messages.required)
    .moreThan(0, messages.positiveNumber),
});

// Community Tax validation schema
export const communityTaxSchema = Yup.object().shape({
  date: Yup.date()
    .required(messages.required)
    .max(new Date(), messages.futureDate),
  taxpayerType: Yup.string()
    .required(messages.required),
  taxpayerName: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  address: Yup.string()
    .required(messages.required)
    .max(200, 'Address too long'),
  basicTax: Yup.number()
    .required(messages.required)
    .moreThan(0, messages.positiveNumber),
  additionalTax: Yup.number()
    .required(messages.required)
    .min(0, 'Amount cannot be negative'),
  interest: Yup.number()
    .min(0, 'Amount cannot be negative'),
});

// Real Property Tax validation schema
export const realPropertyTaxSchema = Yup.object().shape({
  date: Yup.date()
    .required(messages.required)
    .max(new Date(), messages.futureDate),
  tdNumber: Yup.string()
    .required(messages.required)
    .matches(/^TD-\d{3}-\d{4}$/, 'Invalid TD number format (e.g., TD-123-2024)'),
  taxpayerName: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  location: Yup.string()
    .required(messages.required)
    .max(200, 'Location too long'),
  basicTax: Yup.number()
    .required(messages.required)
    .moreThan(0, messages.positiveNumber),
  sef: Yup.number()
    .required(messages.required)
    .moreThan(0, messages.positiveNumber),
  penalty: Yup.number()
    .min(0, 'Amount cannot be negative'),
});

// Location validation schemas
export const barangaySchema = Yup.object().shape({
  code: Yup.string()
    .required(messages.required)
    .matches(/^BRG\d{3}$/, 'Invalid barangay code format (e.g., BRG001)'),
  name: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  type: Yup.string()
    .required(messages.required),
  population: Yup.number()
    .required(messages.required)
    .min(0, 'Population cannot be negative'),
  status: Yup.string()
    .required(messages.required),
});

export const municipalitySchema = Yup.object().shape({
  code: Yup.string()
    .required(messages.required)
    .matches(/^MUN\d{3}$/, 'Invalid municipality code format (e.g., MUN001)'),
  name: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  type: Yup.string()
    .required(messages.required),
  province: Yup.string()
    .required(messages.required),
  status: Yup.string()
    .required(messages.required),
});

export const provinceSchema = Yup.object().shape({
  code: Yup.string()
    .required(messages.required)
    .matches(/^PRV\d{3}$/, 'Invalid province code format (e.g., PRV001)'),
  name: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  region: Yup.string()
    .required(messages.required),
  status: Yup.string()
    .required(messages.required),
});

export const regionSchema = Yup.object().shape({
  code: Yup.string()
    .required(messages.required)
    .matches(/^REG\d{3}[A-Z]?$/, 'Invalid region code format (e.g., REG003 or REG004A)'),
  name: Yup.string()
    .required(messages.required)
    .max(100, 'Name too long'),
  description: Yup.string()
    .required(messages.required)
    .max(200, 'Description too long'),
  status: Yup.string()
    .required(messages.required),
});

// Common validation functions
export const validatePhoneNumber = (value) => {
  return patterns.phone.test(value);
};

export const validateEmail = (value) => {
  return patterns.email.test(value);
};

export const validateTIN = (value) => {
  return patterns.tin.test(value);
};

export const validateSSS = (value) => {
  return patterns.sss.test(value);
};

export const validatePhilHealth = (value) => {
  return patterns.philHealth.test(value);
};

export const validatePagIbig = (value) => {
  return patterns.pagIbig.test(value);
};

export const validateAmount = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

export const validateDate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const validateFutureDate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date > new Date();
};

export const validatePastDate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date < new Date();
};