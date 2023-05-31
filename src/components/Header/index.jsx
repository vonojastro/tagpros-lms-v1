import React from "react";
import './index.css'
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleClickCancel = () => navigate("/");

  return (
    <div className="shadow-bottom d-flex align-items-center justify-between w-100">
      <img src="img/tagpros-logo-small2.png" className="logo" alt="tagpros" />
      <button
        className="ml-auto mr-4 font-bold btn btn-light"
        onClick={handleClickCancel}
      >
        Cancel
      </button>
    </div>
  );
}
