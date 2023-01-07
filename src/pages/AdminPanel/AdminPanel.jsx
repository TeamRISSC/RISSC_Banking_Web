import "./adminpanel.scss";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../../layout/sidebar/AdminSidebar";
import Navbar from "../../layout/navbar/Navbar";
import Customers from "./Customers/Customers";
import Overview from "./Overview/Overview";
import Accounts from "./Accounts/Accounts";
import FixedDeposits from "./FixedDeposits/FixedDeposits";
import Loans from "./Loans/Loans";
import Transactions from "./Transactions/Transactions";
import CustomerDetails from "./Customers/CustomerDetails/CustomerDetails";

function AdminPanel() {
  // control the responsive sidebar
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // toggle sidebar
  function toggleSidebar() {
    setIsSidebarActive((prev) => !prev);
  }
  // declare media queries
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  // auto detect media queries
  useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="adminpanel">
      <Sidebar
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={
          isSidebarActive
            ? "adminpanel-container collapse"
            : "adminpanel-container"
        }
      >
        <header>
          <Navbar isSidebarActive={isSidebarActive} />
        </header>

        <main className="adminpanel-main">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:userId" element={<CustomerDetails />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/fixed-deposits" element={<FixedDeposits />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
