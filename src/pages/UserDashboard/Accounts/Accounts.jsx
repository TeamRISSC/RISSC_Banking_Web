import "./accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import popCrud from "../../../api/popCrud";
import useGetUserSavingsAccounts from "../../../hooks/queries/users/useGetUserSavingsAccounts";
import useGetUserFixedDeposits from "../../../hooks/queries/users/useGetUserFixedDeposits";

function Accounts() {
  // fetch and cache all accounts
  const {data: accounts} = useGetUserSavingsAccounts()
  // console.log(accounts);

  // fetch and cache all fixed deposits
  const {data: fixed_deposits} = useGetUserFixedDeposits()

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

  const acc_columns = [
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

  const acc_rows = accounts?.map(account => (
    {
      id: account.accountNumber,
      name: account.name,
      balance: `Rs. ${account.balance}`,
      accountType: account.accountType,
      branchID: `#${account.branchID}`,
    }
  ))

  const fd_columns = [
    { 
      field: 'id', headerName: 'Fixed Deposit Number', minWidth: 130, flex: 1
    },
    { 
      field: 'accId', headerName: 'Linked Account Number', minWidth: 130, flex: 1
    },
    { 
      field: 'amount', headerName: 'Amount', minWidth: 80, flex: 1
    },
    { 
      field: 'period', headerName: 'Time Period', minWidth: 100, flex: 1
    },
    { 
      field: 'interestRate', headerName: 'Interest Rate', minWidth: 80, flex: 1
    },
    { 
      field: 'matuarityDate', headerName: 'Matuarity Date', minWidth: 100, flex: 1
    },
  ];


  const fd_rows = fixed_deposits?.map(fd => (
    {
      id: fixed_deposits.ID,
      accId: fixed_deposits.linkedAccountID,
      amount: `Rs. ${fixed_deposits.amount}`,
      period: `${fixed_deposits.period} months`,
      interestRate: `${fixed_deposits.interestRate}%`,
      matuarityDate: fixed_deposits.matuarityDate,
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
      
      <div style={{ height: 300, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {accounts &&
            <DataGrid
              autoHeight
              className='table'
              rows={acc_rows}
              columns={acc_columns}
              pageSize={10}
              acc_rowsPerPageOptions={[10]}
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
        <h2>Fixed Deposits</h2>
      </div>

      <div style={{ height: 300, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {fixed_deposits &&
            <DataGrid
              autoHeight
              className='table'
              rows={fd_rows}
              columns={fd_columns}
              pageSize={10}
              acc_rowsPerPageOptions={[10]}
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