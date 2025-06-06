import { useState } from 'react';
import { Formik, Form } from 'formik';
import { PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import FormField from '../../components/common/FormField';
import { realPropertyTaxSchema } from '../../utils/validationSchemas';

function RealPropertyTaxPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  
  // Mock data for table
  const payments = [
    {
      id: 1,
      receiptNumber: 'RPT-2024-01-0001',
      date: '2024-01-15',
      tdNumber: 'TD-123-2024',
      taxpayerName: 'John Smith',
      location: 'Lot 1, Block 2, Sample Subdivision',
      basicTax: 5000,
      sef: 1000,
      penalty: 0,
      totalAmount: 6000,
      status: 'Paid',
    },
    {
      id: 2,
      receiptNumber: 'RPT-2024-01-0002',
      date: '2024-01-20',
      tdNumber: 'TD-124-2024',
      taxpayerName: 'Jane Doe',
      location: 'Lot 5, Block 3, Another Subdivision',
      basicTax: 7500,
      sef: 1500,
      penalty: 500,
      totalAmount: 9500,
      status: 'Paid',
    },
  ];
  
  // Format amount as Philippine Peso
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  };
  
  // Table columns
  const columns = [
    {
      key: 'receiptNumber',
      header: 'Receipt No.',
      sortable: true,
      className: 'font-medium text-neutral-900',
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'tdNumber',
      header: 'TD Number',
      sortable: true,
    },
    {
      key: 'taxpayerName',
      header: 'Taxpayer',
      sortable: true,
    },
    {
      key: 'basicTax',
      header: 'Basic Tax',
      sortable: true,
      render: (value) => formatCurrency(value),
      className: 'text-right',
    },
    {
      key: 'sef',
      header: 'SEF',
      sortable: true,
      render: (value) => formatCurrency(value),
      className: 'text-right',
    },
    {
      key: 'penalty',
      header: 'Penalty',
      sortable: true,
      render: (value) => formatCurrency(value),
      className: 'text-right',
    },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      sortable: true,
      render: (value) => formatCurrency(value),
      className: 'text-right font-medium',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'Paid' ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];
  
  // Actions for table rows
  const actions = [
    {
      icon: EyeIcon,
      title: 'View',
      onClick: (payment) => handleViewPayment(payment),
      className: 'text-primary-600 hover:text-primary-900 p-1 rounded-full hover:bg-primary-50'
    },
    {
      icon: PencilIcon,
      title: 'Edit',
      onClick: (payment) => handleEditPayment(payment),
      className: 'text-primary-600 hover:text-primary-900 p-1 rounded-full hover:bg-primary-50'
    },
  ];
  
  const handleCreatePayment = () => {
    setCurrentPayment(null);
    setIsModalOpen(true);
  };
  
  const handleViewPayment = (payment) => {
    setCurrentPayment(payment);
    setIsModalOpen(true);
  };
  
  const handleEditPayment = (payment) => {
    setCurrentPayment(payment);
    setIsModalOpen(true);
  };
  
  const handleSubmit = (values, { setSubmitting }) => {
    realPropertyTaxSchema.validate(values, { abortEarly: false })
      .then(() => {
        // If validation passes, proceed with submission
        console.log('Form data:', values);
        setIsModalOpen(false);
      })
      .catch((err) => {
        // Handle validation errors
        console.error('Validation errors:', err.errors);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <h1>Real Property Tax</h1>
            <p>Manage real property tax collections</p>
          </div>
          <button
            type="button"
            onClick={handleCreatePayment}
            className="btn btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Payment
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={payments}
          actions={actions}
          pagination={true}
        />
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPayment ? "Edit Payment" : "New Payment"}
        size="lg"
      >
        <Formik
          initialValues={{
            date: new Date().toISOString().split('T')[0],
            tdNumber: '',
            taxpayerName: '',
            location: '',
            basicTax: '',
            sef: '',
            penalty: '0',
            ...currentPayment,
          }}
          validationSchema={realPropertyTaxSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Date"
                  name="date"
                  type="date"
                  required
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.date}
                  touched={touched.date}
                />
                
                <FormField
                  label="TD Number"
                  name="tdNumber"
                  type="text"
                  required
                  placeholder="Enter TD number"
                  value={values.tdNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.tdNumber}
                  touched={touched.tdNumber}
                />
              </div>
              
              <FormField
                label="Taxpayer Name"
                name="taxpayerName"
                type="text"
                required
                placeholder="Enter taxpayer name"
                value={values.taxpayerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.taxpayerName}
                touched={touched.taxpayerName}
              />
              
              <FormField
                label="Property Location"
                name="location"
                type="textarea"
                required
                placeholder="Enter property location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.location}
                touched={touched.location}
                rows={2}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Basic Tax"
                  name="basicTax"
                  type="number"
                  required
                  placeholder="0.00"
                  value={values.basicTax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.basicTax}
                  touched={touched.basicTax}
                  min="0"
                  step="0.01"
                />
                
                <FormField
                  label="SEF"
                  name="sef"
                  type="number"
                  required
                  placeholder="0.00"
                  value={values.sef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.sef}
                  touched={touched.sef}
                  min="0"
                  step="0.01"
                />
                
                <FormField
                  label="Penalty"
                  name="penalty"
                  type="number"
                  placeholder="0.00"
                  value={values.penalty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.penalty}
                  touched={touched.penalty}
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">Total Amount</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(
                        Number(values.basicTax || 0) +
                        Number(values.sef || 0) +
                        Number(values.penalty || 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Saving...' : currentPayment ? 'Update' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default RealPropertyTaxPage;