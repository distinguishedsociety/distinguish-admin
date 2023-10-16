import { SidebarData } from "../components/SidebarData";
import { CAPABILITIES } from "./Constants";

export const filterAllowedData = (allowedUserCapabilities, role) => {
  const filteredData = [];
  SidebarData.map((category, index) => {
    const filteredCategory = [];
    category.menuItems.map((menuItem, index) => {
      //Menu
      if (menuItem.subMenuItems && menuItem.subMenuItems.length !== 0) {
        //Sub menu
        const temp = menuItem.subMenuItems.filter((subNav, index) => {
          return (
            (allowedUserCapabilities &&
              allowedUserCapabilities.includes(subNav.capability)) ||
            subNav.capability === CAPABILITIES.ALLOWED_BY_DEFAULT
          );
        });

        if (temp.length !== 0) {
          const tempModule = menuItem;
          tempModule.subMenuItems = temp;
          filteredCategory.push(tempModule);
        }
      } else {
        if (
          (allowedUserCapabilities &&
            allowedUserCapabilities.includes(menuItem.capability)) ||
          menuItem.capability === CAPABILITIES.ALLOWED_BY_DEFAULT
        ) {
          filteredCategory.push(menuItem);
        }
      }
    });
    if (filteredCategory.length > 0)
      filteredData.push({ ...category, menuItems: filteredCategory });
  });
  return filteredData;
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const formatDate = (date = new Date()) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
