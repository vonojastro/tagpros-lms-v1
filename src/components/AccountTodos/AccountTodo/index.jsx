import React from "react";
import PropTypes from "prop-types";

function AccountTodo({ title, done }) {
  return (
    <li className="list-group-item" data-role="task" style={{ pointerEvents: "none" }}>
      <div className="checkbox checkbox-info">
        <input
          type="checkbox"
          id="inputSchedule"
          name="inputCheckboxesSchedule"
          checked={done}
        />
        <label htmlFor="inputSchedule" className={done ? "task-done" : ""}>
          {" "}
          <span>{title}</span>{" "}
        </label>
      </div>
    </li>
    //
  );
}

AccountTodo.propTypes = {
  done: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default AccountTodo;
