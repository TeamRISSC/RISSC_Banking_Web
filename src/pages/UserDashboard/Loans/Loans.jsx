import "./loans.scss"
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import { loansColumns, loansRows } from "../../../schemas/admin/loans";

import useGetUserLoans from "../../../hooks/queries/users/useGetUserLoans";
import useGetUserOnlineLoans from "../../../hooks/queries/users/useGetUserOnlineLoans";

function Loans() {
  const {data: p_loans} = useGetUserLoans();
  const {data: o_loans} = useGetUserOnlineLoans();
  const loans = (p_loans && o_loans) && p_loans.concat(o_loans);
  // console.log(loans);

  return (
    <div className="loans">

      <div className="title">
        <h2>Loans</h2>
        <div className="loan-actions">
        <Link to={"/userdashboard/onlineloan"}>
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
              rows={loansRows(loans)}
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