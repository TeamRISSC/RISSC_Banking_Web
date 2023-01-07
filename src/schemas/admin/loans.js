import {currency, date} from '../../helpers/formatters'

export const loansColumns = [
    { 
      field: 'type', headerName: 'Loan Type', minWidth: 150, flex: 1
    },
    { 
      field: 'applyDate', headerName: 'Apply Date', type: 'date' , minWidth: 100, flex: 1
    },
    { 
      field: 'approveDate', headerName: 'Approval Date', type: 'date' , minWidth: 100, flex: 1
    },
    { 
      field: 'amount', headerName: 'Amount', minWidth: 70, flex: 1
    },
    { 
      field: 'period', headerName: 'Time Period', minWidth: 70, flex: 1
    },
  ];
 
export function loansRows(loans) {
    const rows = loans?.map(loan => (
    {
        id: loan.loanType + loan.ID,
        applyDate: date(loan.applyDate),
        approveDate: loan.approveDate ? date(loan.approveDate) : date(loan.applyDate) + " (Automatic)",
        amount: currency(loan.amount),
        period: `${loan.timePeriod} years`,
        type: loan.loanType,
    }
    ))
    return rows
}