import React, { useEffect, useState } from "react";
import "./Profile.module.css";
import { MdOutlineModeEditOutline, MdDone } from "react-icons/md";
import { Helmet } from "react-helmet";
import { EditEmail } from "./EditEmail";
import { EditPhone } from "./EditPhone";
import { EditUsername } from "./EditUsername";

export const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="row">
        <div className="col-md-7 col-sm-10 mx-auto mt-5 pt-5">
          <div className="card">
            <div className="d-flex flex-column">
              <div className="d-flex flex-column border-bottom ps-4 pe-4 pt-4 pb-4">
                <h4>Account Information</h4>
                <p className="text-muted">Some of your personal info here</p>
              </div>
              <div className="row ps-4 pe-4 pt-3 pb-3 border-bottom align-items-center">
                <div className="col-2">
                  <p className="text-muted">GUID</p>
                </div>
                <div className="col-10">
                  <p>8891A</p>
                </div>
              </div>

              <div className="row ps-4 pe-4 pt-3 pb-3 border-bottom align-items-center">
                <div className="col-2">
                  <p className="text-muted">Username</p>
                </div>
                <div className="col-9">sharmaSwapnil</div>
                <div className="col-1 d-flex justify-content-end">
                  <MdOutlineModeEditOutline
                    size={"1.5rem"}
                    data-bs-toggle="collapse"
                    data-bs-target="#editUsername"
                    aria-expanded="false"
                    aria-controls="editUsername"
                  />
                </div>
                <EditUsername />
              </div>

              <div className="row ps-4 pe-4 pt-3 pb-3 border-bottom align-items-center">
                <div className="col-2">
                  <p className="text-muted">Email</p>
                </div>
                <div className="col-9">
                  <p>Swapnil@miniorange.com</p>
                </div>
                <div className="col-1 d-flex justify-content-end">
                  <MdOutlineModeEditOutline
                    size={"1.5rem"}
                    data-bs-toggle="collapse"
                    href="#editEmail"
                    role="button"
                    aria-expanded="false"
                    aria-controls="editEmail"
                  />
                </div>
                <EditEmail />
              </div>
              <div className="row ps-4 pe-4 pt-3 pb-3 border-bottom align-items-center">
                <div className="col-2">
                  <p className="text-muted">Phone</p>
                </div>
                <div className="col-9">+91 9123321233</div>
                <div className="col-1 d-flex justify-content-end">
                  <MdOutlineModeEditOutline
                    size={"1.5rem"}
                    data-bs-toggle="collapse"
                    href="#editPhone"
                    role="button"
                    aria-expanded="false"
                    aria-controls="editPhone"
                  />
                </div>
                <EditPhone />
              </div>
            </div>
          </div>
          <div className="card mt-4 mb-4">
            <div className="d-flex flex-column">
              <div className="border-bottom row align-items-center ps-4 pe-4 pt-4 pb-4 justify-content-between">
                <div className="col-8">
                  <h4>Personal Information and Custom Attribures</h4>
                  <p className="text-muted">Some of your personal info here</p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <button className="btn btn-primary ps-2 pe-3 pt-1 pb-1">
                    <MdDone /> Save
                  </button>
                </div>
              </div>
              <div className="row ps-4 pe-4 pt-3 pb-3 align-items-center">
                <div className="col-2">
                  <p className="text-muted">First Name</p>
                </div>
                <div className="col-10">
                  <input
                    class="col-6 mt-2 p-1 form-control w-50"
                    type="text"
                    placeholder="Enter First Name"
                    value="Swapnil"
                  />
                </div>
              </div>
              <div className="row ps-4 pe-4 pt-3 pb-3 align-items-center">
                <div className="col-2">
                  <p className="text-muted">Last Name</p>
                </div>
                <div className="col-10">
                  <input
                    class="col-6 mt-2 p-1 form-control w-50"
                    type="text"
                    placeholder="Enter Last Name"
                    value="Sharma"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
