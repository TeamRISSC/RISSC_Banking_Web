import "./transactions.scss"
import { DataGrid } from '@mui/x-data-grid';
import useGetUserTransactions from "../../../hooks/queries/users/useGetUserTransactions";

function Transactions() {
  const {data: transactions} = useGetUserTransactions();
  // console.log(transactions)

    // convert date to string
    function date(date) {
      const display = new Date(date)
      return display.toLocaleDateString('en-GB');
    }

    const currency = (value) => {
      const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'});
      return formatter.format(value).replace("LKR", "Rs.")
    };

    const columns = [
      { 
        field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1
      },
      { 
        field: 'type', headerName: 'Type', minWidth: 70, flex: 1
      },
      { 
        field: 'amount', headerName: 'Amount', minWidth: 70, flex: 1
      },
      { 
        field: 'remarks', headerName: 'Remarks', minWidth: 150, flex: 2.2
      },
    ];
    
    const rows = transactions?.map(transaction => (
      {
        date: date(transaction.date),
        id: transaction.type + transaction.ID,
        type: transaction.type,
        amount: currency(transaction.amount),
        remarks: transaction.remarks? transaction.remarks : 'N/A',
      }
    ))

  return (
    <div className="transactions">

      <div className="title">
        <h2>Transactions</h2>
      </div>

      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {transactions &&
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

export default Transactions