import "./sidebar.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageIcon from "@mui/icons-material/Language";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { AuthContext } from "../../context/Auth-context";

function Sidebar(props) {
  // import signout fnc form auth context
  const { signOut } = useContext(AuthContext);

  // destructure props
  const { isSidebarActive, toggleSidebar } = props;

  return (
    <div className={isSidebarActive ? "sidebar collapse" : "sidebar"}>
      <div className="top" onClick={toggleSidebar}>
        <LanguageIcon className="icon" />

        {!isSidebarActive && <p className="logo">RISSC Bank</p>}
      </div>

      <div className="center">
        <ul>
          <Link to={"/adminpanel"}>
            <li>
              <DashboardIcon className="icon" />
              {!isSidebarActive && <p>Overview</p>}
            </li>
          </Link>

          <Link to={"/adminpanel/customers"}>
            <li>
              <AccountCircleIcon className="icon" />
              {!isSidebarActive && <p>Customers</p>}
            </li>
          </Link>

          <Link to={"/adminpanel/accounts"}>
            <li>
              <AccountBalanceWalletIcon className="icon" />
              {!isSidebarActive && <p>Accounts</p>}
            </li>
          </Link>

          <Link to={"/adminpanel/fixed-deposits"}>
            <li>
              <AccountBalanceWalletIcon className="icon" />
              {!isSidebarActive && <p>Fixed Deposits</p>}
            </li>
          </Link>

          <Link to={"/adminpanel/loans"}>
            <li>
              <AccountBalanceWalletIcon className="icon" />
              {!isSidebarActive && <p>Loans</p>}
            </li>
          </Link>

          <Link to={"/adminpanel/transactions"}>
            <li>
              <ViewListOutlinedIcon className="icon" />
              {!isSidebarActive && <p>Transactions</p>}
            </li>
          </Link>

          <li onClick={signOut}>
            <ExitToAppOutlinedIcon className="icon" />
            {!isSidebarActive && <p>Sign Out</p>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
