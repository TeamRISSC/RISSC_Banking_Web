import "./onlineloan.scss"
import React from 'react'
import {useFormik} from 'formik'

import { date } from "../../../helpers/formatters";

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
      branchID: "00001",
      customerID : '',
			FDID: '',
			amount: '',
      applyDate: '',
      timePeriod: '',
      linkedAccountID: '',
      fixedDepositIndex: 0,
		},
		validationSchema: onlineLoanSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `A loan of Rs. ${values.amount} will be created to be paid in ${values.timePeriod} years.`,
        'Proceed',
        ()=>apiCrud(`/api/createOnlineLoan`, 'POST', 'Successful transaction', {
          branchID: values.branchID,
          customerID: fixed_deposits[values.fixedDepositIndex].customerID,
          FDID: fixed_deposits[values.fixedDepositIndex].ID,
          amount: values.amount,
          applyDate: date(new Date()),
          timePeriod: values.timePeriod,
          linkedAccountID: fixed_deposits[values.fixedDepositIndex].linkedAccountID,
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
              name="fixedDeposit"
              value={values.fixedDepositIndex}
              onChange={handleChange}
              onBlur={handleBlur}>
              {fixed_deposits?.map((fixed_deposit, index) => (
                <option key={index} value={index}>{fixed_deposit.ID}</option>))}
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
          name="timePeriod" 
          required
          placeholder={'Enter time period in years'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.timePeriod}
          />							
          {touched.timePeriod 
            ? 
              errors.timePeriod 
              ? <p className="error">{errors.timePeriod}</p> 
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