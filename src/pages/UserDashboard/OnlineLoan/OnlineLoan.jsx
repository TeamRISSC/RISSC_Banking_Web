import "./onlineloan.scss"
import React from 'react'
import {useFormik} from 'formik'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { onlineLoanSchema } from "../../../schemas/onlineLoanSchema";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import useGetUserCurrentAccounts from "../../../hooks/queries/users/useGetUserSavingsAccounts";
import useGetUserSavingsAccounts from "../../../hooks/queries/users/useGetUserCurrentAccounts";
import useGetUserFixedDeposits from "../../../hooks/queries/users/useGetUserFixedDeposits";

function OnlineLoan() {
  const {data: s_accounts} = useGetUserSavingsAccounts();
  const {data: c_accounts} = useGetUserCurrentAccounts();
  const accounts = c_accounts && s_accounts.concat(c_accounts).sort((a, b) => +a.accountNumber - +b.accountNumber);

  const {data: fixed_deposits} = useGetUserFixedDeposits();

  // handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			fixedDepositID: '',
			linkedAccountID: '',
			amount: '',
      period: '',
		},
		validationSchema: onlineLoanSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `$A loan of Rs. ${values.amount} will be deposited to account ${values.linkedAccountID}`,
        'Proceed',
        ()=>apiCrud(`/api/createOnlineLoan`, 'POST', 'Successful transaction', {
          fixedDepositID: values.fixedDepositID,
          linkedAccountID: values.linkedAccountID,
          amount: values.amount,
          period: values.period,
          date: new Date().toISOString().slice(0, 10),
        })()
      )
		}
})

  const onlineLoanForm =(
		<main className='onlineloan-form'>
      <form action="/home" onSubmit={handleSubmit}>

        <div className="input-holder">
          <label>Linked Fixed Deposit Number</label><br/>
          <select 
              name="fixedDepositID"
              value={values.fixedDepositID}
              onChange={handleChange}
              onBlur={handleBlur}>
            {fixed_deposits?.map((fixed_deposit) => (
              <option value={fixed_deposit.ID}>{fixed_deposit.ID}</option>))}
          </select>
        </div>

        <div className="input-holder">
          <label>Amount</label><br/>
          <input 
          type="text" 
          name="amount" 
          required
          placeholder={'Enter amount'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.amount}
          />							
          {touched.amount 
            ? 
              errors.amount 
              ? <p className="error">{errors.amount}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <label>Account to Deposit Loan</label><br/>
          <select 
              name="linkedAccountID"
              value={values.linkedAccountID}
              onChange={handleChange}
              onBlur={handleBlur}>
            {accounts?.map((accounts) => (
              <option value={accounts.accountNumber}>{accounts.accountNumber}</option>))}
          </select>
        </div>

        <div className="input-holder">
          <label>Time Period (Years)</label><br/>
          <input 
          type="text" 
          name="period" 
          required
          placeholder={'Enter time period in years'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.period}
          />							
          {touched.period 
            ? 
              errors.period 
              ? <p className="error">{errors.period}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree to the <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of use</a></span>.
        </div>

        <button id="sub_btn" type="submit">Submit</button>

      </form>
		</main>
	)

  return (
    <div className="onlineloan">

      <div className="title">
        <h2>Get Online Loan</h2>
      </div>

      {onlineLoanForm}

    </div>
  )
}

export default OnlineLoan