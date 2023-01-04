import "./onlineloan.scss"
import React from 'react'
import {useFormik} from 'formik'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { onlineLoanSchema } from "../../../schemas/onlineLoanSchema";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import useGetUserCurrentAccounts from "../../../hooks/queries/users/useGetUserSavingsAccounts";
import useGetUserSavingsAccounts from "../../../hooks/queries/users/useGetUserCurrentAccounts";

function OnlineLoan() {
  const {data: s_accounts} = useGetUserSavingsAccounts();
  const {data: c_accounts} = useGetUserCurrentAccounts();
  const accounts = c_accounts && s_accounts.concat(c_accounts).sort((a, b) => +a.accountNumber - +b.accountNumber);;

  // handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			fixedDepositID: '',
			linkedAccountID: '',
			amount: '',
      period: '',
      date: '',
		},
		validationSchema: onlineLoanSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `$${values.amount} will be tranfered from account ${values.fromAccountID} to account ${values.toAccountID}`,
        'Proceed!',
        ()=>apiCrud(`/api/createOnlineLoan`, 'POST', 'Successful transaction', {
          fromAccountID: values.fromAccountID,
          amount: values.amount,
          toAccountID: values.toAccountID,
          date: new Date().toISOString().slice(0, 10),
          remarks: values.remarks,
        })()
      )
		}
})

  const onlineLoanForm =(
		<main className='onlineloan-form'>
      <form action="/home" onSubmit={handleSubmit}>

        <div className="input-holder">
          <label>Account Number<span style={{color: 'red'}}> (From)</span></label><br/>
          <select 
              name="fromAccountID"
              value={values.fromAccountID}
              onChange={handleChange}
              onBlur={handleBlur}>
            {accounts?.map((account) => (
              <option value={account.accountNumber}>{account.accountNumber}</option>))}
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
          <label>Account Number<span style={{color: 'green'}}> (To)</span></label><br/>
          <input 
          type="text" 
          name="toAccountID"
          required 
          placeholder={'Enter an account number'} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.toAccountID}
          />
          {touched.toAccountID 
            ? 
              errors.toAccountID 
              ? <p className="error">{errors.toAccountID}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <label>Remarks</label><br/>
          <input 
          type="text" 
          name="remarks"
          required 
          placeholder={'Enter remarks'} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.remarks}
          />
          {touched.remarks 
            ? 
              errors.remarks 
              ? <p className="error">{errors.remarks}</p> 
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