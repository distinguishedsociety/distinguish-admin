import { CAPABILITIES } from "../utils/Constants";

export const SidebarData = [
  {
    category: "root",
    menuItems: [
      {
        title: "Dashboard",
        path: "/",
        icon: "dashboard",
        subMenuItems: [],
        capability: CAPABILITIES.CUSTOMER_DASHBOARD,
      },
      {
        title: "Users",
        path: "/users",
        icon: "groups",
        subMenuItems: [],
        capability: CAPABILITIES.CUSTOMER_DASHBOARD,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: "content_paste",
        subMenuItems: [],
        capability: CAPABILITIES.CUSTOMER_DASHBOARD,
      },
      {
        title: "Blogs",
        path: "/blogs",
        icon: "content_paste",
        subMenuItems: [],
        capability: CAPABILITIES.CUSTOMER_DASHBOARD,
      },
    ],
  },
  {
    category: "Manage",
    menuItems: [
      {
        title: "Products",
        path: "/products",
        icon: "person",
        id: "users-menu",
        subMenuItems: [
          {
            title: "Add Product",
            path: "/add-product",
            capability: CAPABILITIES.MANAGE_USERS,
          },
          {
            title: "Product List",
            path: "/products",
            capability: CAPABILITIES.MANAGE_USERS,
          },
          {
            title: "Inventory",
            path: "/inventory",
            capability: CAPABILITIES.MANAGE_CAPABILITIES,
          },
        ],
      },
      {
        title: "Coupons",
        path: "/coupons",
        icon: "star_half",
        id: "coupons-menu",
        subMenuItems: [
          {
            title: "Add Coupon",
            path: "/add-coupon",
            capability: CAPABILITIES.MANAGE_USERS,
          },
          {
            title: "Coupons List",
            path: "/coupons",
            capability: CAPABILITIES.MANAGE_USERS,
          }
        ],
      },
      {
        title: "Categories",
        path: "/categories",
        icon: "groups",
        id: "groups-menu",
        subMenuItems: [],
      },
      {
        title: "Collections",
        path: "/collections",
        icon: "groups",
        id: "groups-menu",
        subMenuItems: [],
      },
      {
        title: "Miscellaneous",
        path: "/groups",
        icon: "groups",
        id: "groups-menu",
        subMenuItems: [
          {
            title: "Manage Banner",
            path: "/banners",
            capability: CAPABILITIES.MANAGE_GROUPS,
          },
          {
            title: "Manage Intro Banner",
            path: "/intro-banner",
            capability: CAPABILITIES.MANAGE_GROUPS,
          },
        ],
      },
    ],
  },
];
