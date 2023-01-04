import "./accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import popCrud from "../../../api/popCrud";
import useGetUserSavingsAccounts from "../../../hooks/queries/users/useGetUserSavingsAccounts";

function Accounts() {
  // fetch and cache all accounts
  const {data: accounts} = useGetUserSavingsAccounts()
  // console.log(accounts);

  // deposit
  function deposit() {
    popCrud(
      'Deposit', 
      ['Account Number', 'Amount'], 
      ['toAccountID', 'amount'], 
      `/api/deposit`,
      'POST',
      'Successful transaction'
    )
  }

  // withdraw
  function withdraw() {
    popCrud(
      'Withdraw', 
      ['Account Number', 'Amount'], 
      ['fromAccountID', 'amount'], 
      `/api/withdraw`,
      'POST',
      'Successful transaction'
    )
  }

  const columns = [
    { 
      field: 'id', headerName: 'Account Number', minWidth: 130, flex: 1
    },
    { 
      field: 'name', headerName: 'Account Name', minWidth: 130, flex: 1
    },
    { 
      field: 'balance', headerName: 'Balance', minWidth: 80, flex: 1
    },
    { 
      field: 'accountType', headerName: 'Type', minWidth: 70, flex: 1
    },
    { 
      field: 'branchID', headerName: 'Branch', minWidth: 130, flex: 1
    },
  ];
  
  const rows = accounts?.map(account => (
    {
      id: account.accountNumber,
      name: account.name,
      balance: `Rs. ${account.balance}`,
      accountType: account.accountType,
      branchID: `#${account.branchID}`,
    }
  ))

  return (
    <div className="accounts">

      <div className="title">
        <h2>Accounts</h2>

        <div className="account-actions">
          <div className="account-actions-bottom">
            <button onClick={deposit}>
              Deposit
            </button>
            <button onClick={withdraw}>
              Withdraw
            </button>
          </div>

        </div>
      </div>
      
      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {accounts &&
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

export default Accounts