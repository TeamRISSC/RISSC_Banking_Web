import "./onlineloan.scss"
import React from 'react'
import {useFormik} from 'formik'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { onlineLoanSchema } from "../../../schemas/onlineLoanSchema";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import useGetUserFixedDeposits from "../../../hooks/queries/users/useGetUserFixedDeposits";

function OnlineLoan() {
  const {data: fixed_deposits} = useGetUserFixedDeposits();

  // handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			fixedDepositID: '',
			amount: '',
      period: '',
		},
		validationSchema: onlineLoanSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `$A loan of Rs. ${values.amount} will be created to be paid in ${values.period} years.`,
        'Proceed',
        ()=>apiCrud(`/api/createOnlineLoan`, 'POST', 'Successful transaction', {
          fixedDepositID: values.fixedDepositID,
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