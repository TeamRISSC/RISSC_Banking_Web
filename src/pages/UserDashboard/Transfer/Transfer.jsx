import "./transfer.scss"
import React from 'react'
import {useFormik} from 'formik'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { transferSchema } from "../../../schemas/transferSchema";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";

function Transfer() {

  // handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			fromAccountID: '',
			amount: '',
			toAccountID: '',
      date: '',
      remarks: '',
		},
		validationSchema: transferSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `$${values.amount} will be tranfered from account ${values.fromAccountID} to account ${values.toAccountID}`,
        'Proceed!',
        ()=>apiCrud(`/api/transfer`, 'POST', 'Successful transaction', {
          fromAccountID: values.fromAccountID,
          amount: values.amount,
          toAccountID: values.toAccountID,
          date: new Date().toISOString().slice(0, 10),
          remarks: values.remarks,
        })()
      )
		}
})

  const transferForm =(
		<main className='transfer-form'>
      <form action="/home" onSubmit={handleSubmit}>

        <div className="input-holder">
          <label>Account Number<span style={{color: 'red'}}> (From)</span></label><br/>
          <input 
          type="text" 
          name="fromAccountID"
          required 
          placeholder={'Enter an account number'} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fromAccountID}
          />
          {touched.fromAccountID 
            ? 
              errors.fromAccountID 
              ? <p className="error">{errors.fromAccountID}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <label>Amount</label><br/>
          <input 
          type="text" 
          name="amount" 
          required
          placeholder={'Enter transfer amount'}
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
          <label>Account Number<span style={{color: 'green'}}> (Recipient)</span></label><br/>
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

        <button id="sub_btn" type="submit">Transfer</button>

      </form>
		</main>
	)

  return (
    <div className="transfer">

      <div className="title">
        <h2>Transfer</h2>
      </div>

      {transferForm}

    </div>
  )
}

export default Transfer