import React from "react";
import PropTypes from "prop-types";

function AccountTodos({ title, children }) {
  return (
    <div className="card card-default">
      <div className="card-header">
        <h4 className="card-title m-b-0">{title}</h4>
      </div>
      <div className="card-body collapse show">
        {/* <!-- ============================================================== -->
                                        <!-- To do list widgets -->
                                        <!-- ============================================================== --> */}
        <div className="to-do-widget">
          {/* <!-- .modal for add task --> */}

          {/* <!-- /.modal --> */}
          <ul className="list-task todo-list list-group m-b-0" data-role="tasklist">
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
}

AccountTodos.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default AccountTodos;
