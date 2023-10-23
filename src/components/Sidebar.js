import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { filterAllowedData } from "../utils/utils";
import { SidebarData } from "./SidebarData";

const Sidebar = () => {
  const [filteredData, setFilteredData] = useState(SidebarData);
  const stateData = useSelector((state) => state.data);
  let user;

  if (stateData !== {}) user = stateData.user;

  // useEffect(() => {
  //     const data = filterAllowedData(user ? user.cap : [], user.role ?? "");
  //     setFilteredData(data);
  // }, [stateData]);

  const location = useLocation();

  return (
    <div className="sidebar-wrapper">
      <div className="menu-list pb-5 pt-2">
        <ul id="menu-content" className="menu-content list-unstyled">
          {filteredData.map((category, index) => (
            <>
              <p className="m-2" style={{ paddingLeft: "15px" }}>
                {category.category === "root" ? "" : category.category}
              </p>

              {category.menuItems &&
                category.menuItems.map((menuItem, index) => {
                  if (
                    menuItem.subMenuItems &&
                    menuItem.subMenuItems.length == 0
                  ) {
                    return (
                      <li
                        style={{ lineHeight: "18px" }}
                        key={index}
                        className={
                          location.pathname === menuItem.path
                            ? "active sidebar_menu_li"
                            : "sidebar_menu_li"
                        }
                      >
                        <a
                          href={menuItem.path}
                          className="d-flex align-items-center p-2"
                        >
                          <span
                            className="material-icons me-2"
                            style={{
                              fontSize: "20px",
                            }}
                          >
                            {menuItem.icon}
                          </span>
                          {menuItem.title}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <>
                        <li
                          key={index}
                          className={
                            location.pathname.split("/")[1] ===
                            menuItem.path.slice(1)
                              ? "active"
                              : "sidebar_menu_li"
                          }
                          style={{
                            lineHeight: "18px",
                          }}
                          data-bs-toggle="collapse"
                          data-bs-target={`#${menuItem.id}`}
                          aria-expanded="false"
                          aria-controls={`${menuItem.id}`}
                        >
                          <a
                            href="#"
                            className="d-flex align-items-center justify-content-between p-2"
                          >
                            <div className="d-flex align-items-center">
                              <span
                                className="material-icons me-2"
                                style={{
                                  fontSize: "20px",
                                  width: '20px'
                                }}
                              >
                                {menuItem.icon}
                              </span>
                              {menuItem.title}
                            </div>
                            <span
                              className="material-icons"
                              style={{
                                fontSize: "18px",
                              }}
                            >
                              expand_more
                            </span>
                          </a>
                        </li>
                        <ul
                          className={
                            location.pathname.split("/")[1] ===
                            menuItem.path.slice(1)
                              ? "collapse sub-menu show"
                              : "collapse sub-menu"
                          }
                          id={`${menuItem.id}`}
                          style={{
                            background: "rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          {menuItem.subMenuItems.map((subnav, index) => (
                            <li
                              key={index}
                              className={
                                menuItem.subMenuItems[index].path ===
                                location.pathname
                                  ? "sub-active sub_menu_li"
                                  : "sub_menu_li"
                              }
                              style={{
                                lineHeight: "18px",
                              }}
                            >
                              <a
                                href={menuItem.subMenuItems[index].path}
                                className="d-flex align-items-center p-2"
                              >
                                {subnav.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  }
                })}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
