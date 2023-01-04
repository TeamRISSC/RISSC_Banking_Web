import * as yup from 'yup'

export const onlineLoanSchema = yup.object({
  // fixedDepositID: yup.string()
  //   .min(10, 'Minimum  characters allowed are 11')
  //   .max(10, 'Maximum characters allowed are 11')
  //   .required('Account number is required'),
  amount: yup.number()
    .positive('Enter a vaild amount')
    .required('Amount is required'),
  period: yup.number()
    .positive('Enter a vaild time period')
    .integer('Time period cannot be a decimal')
    .required('Time period is required'),
  // linkedAccountID: yup.string()
  //   .min(10, 'Minimum  characters allowed are 11')
  //   .max(10, 'Maximum characters allowed are 11')
  //   .required('Account number is required'),
})