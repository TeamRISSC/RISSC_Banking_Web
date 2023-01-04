import React, { useEffect, useState } from "react";
import "./userdashboard.scss";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Sidebar from "../../layout/sidebar/UserSidebar";
import Navbar from "../../layout/navbar/Navbar";
import Overview from "./Overview/Overview";
import Accounts from "./Accounts/Accounts";
import Transactions from "./Transactions/Transactions";
import Transfer from "./Transfer/Transfer";
import Loans from "./Loans/Loans";

function UserDashboard() {
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
    <div className="userdashboard">
      <Sidebar
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={
          isSidebarActive
            ? "userdashboard-container collapse"
            : "userdashboard-container"
        }
      >
        <header>
          <Navbar isSidebarActive={isSidebarActive} />
        </header>

        <main className="userdashboard-main">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
