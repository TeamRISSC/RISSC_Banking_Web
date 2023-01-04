import "./loans.scss"
import { DataGrid } from '@mui/x-data-grid';

import {currency, date} from '../../../helpers/formatters'
import apiCrud from "../../../api/apiCrud";
import popAction from '../../../helpers/popAction'
import useGetUserLoans from "../../../hooks/queries/users/useGetUserLoans";

function Loans() {
  const {data: loans} = useGetUserLoans();
  console.log(loans);

    function createNewLoan() {
      popAction(
        'Are you sure?', 
        "A new loan will be created!",
        'Proceed!',
        ()=>apiCrud(`/api/createOnlineLoan`, 'POST', 'Loan created', {
          fixedDepositID: '73633',
          linkedAccountID: '00001',
          amount: '0',
          period: '0',
          date: '2021-09-01'
        })()
      )
    } 

    const columns = [
      { 
        field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1
      },
      { 
        field: 'id', headerName: 'Loan Number', minWidth: 130, flex: 1
      },
      { 
        field: 'amount', headerName: 'Amount', minWidth: 70, flex: 1
      },
      { 
        field: 'class', headerName: 'Loan Type', minWidth: 130, flex: 1
      },
      { 
        field: 'type', headerName: 'Loan Purpose', minWidth: 150, flex: 1
      },
      { 
        field: 'period', headerName: 'Time Period', minWidth: 70, flex: 1
      },
    ];
    
    const rows = loans?.map(loan => (
      {
        date: date(loan.applyDate),
        id: loan.ID,
        amount: currency(loan.amount),
        period: `${loan.timePeriod} years`,
        class: loan.loanClass,
        type: loan.loanType,
      }
    ))

  return (
    <div className="loans">

      <div className="title">
        <h2>Loans</h2>

        <div className="loan-actions">
        <button onClick={createNewLoan}>
          + Get Online Loan
        </button>
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