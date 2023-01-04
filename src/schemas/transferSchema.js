import * as yup from 'yup'

export const transferSchema = yup.object({
  // fromAccountID: yup.string()
  //   .min(10, 'Minimum  characters allowed are 11')
  //   .max(10, 'Maximum characters allowed are 11')
  //   .required('Account number is required'),
  amount: yup.number()
    .positive('Enter a vaild amount')
    .required('Amount is required'),
  toAccountID: yup.string()
    .min(5, 'Invalid Account Number')
    .max(10, 'Invalid Account Number')
    .matches(/^[0-9]+$/, "Invalid Account Number")
    .required('Account number is required'),
  remarks: yup.string()
    .min(3, 'At least 3 characters required')
    .max(20, 'Characters limit exceeded')
    .required('Remarks are required'),
})