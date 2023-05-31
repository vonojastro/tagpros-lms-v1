import React from "react";
import "./index.css";

export default function Avatar({ left, right }) {
  return (
    <div className="avatar__container">
      {left}
      {right}
    </div>
  );
}
