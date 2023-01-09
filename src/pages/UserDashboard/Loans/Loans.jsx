import "./loans.scss"
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import { loansColumns, loansRows } from "../../../schemas/admin/loans";
import { onlineLoansColumns, onlineLoansRows } from "../../../schemas/admin/onlineLoans";

import useGetUserLoans from "../../../hooks/queries/users/useGetUserLoans";
import useGetUserOnlineLoans from "../../../hooks/queries/users/useGetUserOnlineLoans";

function Loans() {
  const {data: p_loans} = useGetUserLoans();
  const {data: o_loans} = useGetUserOnlineLoans();
  // console.log(loans);

  return (
    <div className="loans">

      <div className="title">
        <h2>Online Loans</h2>
        <div className="loan-actions">
        <Link to={"/userdashboard/onlineloan"}>
        <button>
          + Get Online Loan
        </button>
        </Link>
        </div>
      </div>

      <div style={{ height: 250, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {o_loans &&
            <DataGrid
              autoHeight
              className='table'
              rows={onlineLoansRows(o_loans)}
              columns={onlineLoansColumns}
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

      <div className="title">
        <h2>Loans</h2>
      </div>

      <div style={{ height: 300, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {p_loans &&
            <DataGrid
              autoHeight
              className='table'
              rows={loansRows(p_loans)}
              columns={loansColumns}
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