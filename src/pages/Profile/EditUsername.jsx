import React, { useEffect, useState } from "react";
import "./Profile.module.css";
import { useTimer } from "react-timer-hook";

export const EditUsername = () => {
  return (
    <div className="edit-email accordion-collapse collapse" id="editUsername">
      <div className="row " id="usernameEditDiv">
        <div className="col-2"></div>
        <div class="alert alert-info col-8 h-100 p-2 mt-2" role="alert">
          You will be automatically logged out if you will change the username.
        </div>
        <div className="row">
          <div className="col-2"></div>

          <input
            class="col-6 mt-2 p-1 form-control w-50"
            type="text"
            placeholder="Enter Username"
          />

          <div className="d-flex col-4 justify-content-end">
            <button
              className="btn btn-light mt-2 ms-1 p-2"
              data-bs-toggle="collapse"
              data-bs-target="#editUsername"
              aria-expanded="false"
              aria-controls="editUsername"
            >
              Cancel
            </button>
            <button
              className="btn btn-primary mt-2 ms-1 p-1 w-50"
              // onClick={() => ()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
