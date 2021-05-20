import React, { useState } from "react";

import "./FoldOut.css";

export default function FoldOut() {
  const [sidebar, setSidebar] = useState(false);

  //   const showSidebar = () => setSidebar(!sidebar);

  function showSidebar() {
    console.log("button click");
    setSidebar(!sidebar);
  }

  return (
    <>
      <button className="foldout-button" onClick={showSidebar}>
        <p>hej</p>
      </button>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li>hej babe this is menu</li>
        </ul>
      </nav>
    </>
  );
}
