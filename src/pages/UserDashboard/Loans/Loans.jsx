import "./loans.scss"
import { DataGrid } from '@mui/x-data-grid';

import useGetUserLoans from "../../../hooks/queries/users/useGetUserLoans";

function Loans() {
  const {data: loans} = useGetUserLoans();
  console.log(loans);

    // convert date to string
    function date(date) {
      const display = new Date(date)
      return display.toLocaleDateString('en-GB');
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
        amount: `Rs. ${loan.amount}`,
        period: `${loan.timePeriod} years`,
        class: loan.loanClass,
        type: loan.loanType,
      }
    ))

  return (
    <div className="loans">

      <div className="title">
        <h2>Loans</h2>
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