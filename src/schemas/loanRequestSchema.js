import * as yup from 'yup'

export const loanRequestSchema = yup.object({
  branchID: yup.number()
    .required('Branch number is required'),
  customerID: yup.number()
    .required('Customer ID is required'),
  amount: yup.number()
    .positive('Enter a vaild amount')
    .required('Amount is required'),
  timePeriod: yup.number()
    .positive('Enter a vaild time period')
    .integer('Time period cannot be a decimal')
    .required('Time period is required'),
  interestRate: yup.number()
    .positive('Enter a vaild interest rate')
    .required('Interest rate is required'),
  loanPurpose: yup.string()
    .required('Loan purpose is required'),
  linkedAccountID: yup.string()
    .min(10, 'Minimum  characters allowed are 11')
    .max(10, 'Maximum characters allowed are 11')
    .required('Account number is required'),
})