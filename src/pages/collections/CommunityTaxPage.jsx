import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { communityTaxSchema } from '../../utils/validationSchemas';
import Modal from '../../components/common/Modal';
import FormField from '../../components/common/FormField';
import DataTable from '../../components/common/DataTable';

const CommunityTaxPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await communityTaxSchema.validate(values, { abortEarly: false });
      console.log('Form data:', values);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Validation errors:', err.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Tax Certificates</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New
        </button>
      </div>

      <DataTable
        columns={[
          { header: 'Certificate No.', accessor: 'certificateNo' },
          { header: 'Date', accessor: 'date' },
          { header: 'Name', accessor: 'name' },
          { header: 'Amount', accessor: 'amount' }
        ]}
        data={[]}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Community Tax Certificate"
      >
        <Formik
          initialValues={{
            certificateNo: '',
            date: '',
            name: '',
            address: '',
            amount: '',
            purpose: ''
          }}
          validationSchema={communityTaxSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormField
                label="Certificate No."
                name="certificateNo"
                type="text"
              />
              <FormField
                label="Date"
                name="date"
                type="date"
              />
              <FormField
                label="Name"
                name="name"
                type="text"
              />
              <FormField
                label="Address"
                name="address"
                type="text"
              />
              <FormField
                label="Amount"
                name="amount"
                type="number"
              />
              <FormField
                label="Purpose"
                name="purpose"
                type="text"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default CommunityTaxPage;