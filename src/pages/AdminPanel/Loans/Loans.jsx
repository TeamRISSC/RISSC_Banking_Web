import "./loans.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { loansColumns, loansRows } from "../../../schemas/admin/loans";

import useGetLoans from '../../../hooks/queries/admin/useGetLoans'
import useGetOnlineLoans from '../../../hooks/queries/admin/useGetOnlineLoans'

function Loans() {

  // fetch and cache all accounts
  const {data: p_loans} = useGetLoans();
  const {data: o_loans} = useGetOnlineLoans();
  const loans = (p_loans && o_loans) && p_loans.concat(o_loans);

  return (
    <div className="accounts">

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