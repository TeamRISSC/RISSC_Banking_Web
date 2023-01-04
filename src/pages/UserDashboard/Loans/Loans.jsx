import "./loans.scss"
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import {currency, date} from '../../../helpers/formatters'

import popCrud from "../../../api/popCrud";
import popAction from '../../../helpers/popAction'
import useGetUserLoans from "../../../hooks/queries/users/useGetUserLoans";
import useGetUserOnlineLoans from "../../../hooks/queries/users/useGetUserOnlineLoans";

function Loans() {
  const {data: p_loans} = useGetUserLoans();
  const {data: o_loans} = useGetUserOnlineLoans();
  const loans = (p_loans && o_loans) && p_loans.concat(o_loans);
  // console.log(loans);

    function createNewLoan() {
      popAction(
        'Are you sure?', 
        "A new loan will be created!",
        'Proceed!',
        ()=>popCrud(
          'New Loan', 
          ['Account Number', 'Amount'], 
          ['toAccountID', 'amount'], 
          `/api/deposit`,
          'POST',
          'Successful transaction'
        )()
      )
    } 

    const columns = [
      { 
        field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1
      },
      { 
        field: 'amount', headerName: 'Amount', minWidth: 70, flex: 1
      },
      { 
        field: 'type', headerName: 'Loan Type', minWidth: 150, flex: 1
      },
      { 
        field: 'period', headerName: 'Time Period', minWidth: 70, flex: 1
      },
    ];
    
    const rows = loans?.map(loan => (
      {
        id: loan.loanType + loan.ID,
        date: date(loan.applyDate),
        amount: currency(loan.amount),
        period: `${loan.timePeriod} years`,
        type: loan.loanType,
      }
    ))

  return (
    <div className="loans">

      <div className="title">
        <h2>Loans</h2>

        <div className="loan-actions">
        <Link to={"/userdashboard/transfer"}>
        <button>
          + Get Online Loan
        </button>
        </Link>
        </div>
      </div>

      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {loans &&
            <DataGrid
              autoHeight
              className='table'
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell:hover': {
                  cursor: 'pointer'
                },
              }}
            />
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Loans