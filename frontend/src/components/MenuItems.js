import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
const MenuItems = (props) => {
  // id - is used as key in mapping inside MainLayout
  // text - is used to display the text on drawer item
  // icon - is used to display icon with text
  // path - target path of the item
  // pathname - current path of the router
  // onClick - event to change current path

  return [
    {
      id: 1,
      text: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/dashboard"),
    },
    {
      id: 2,
      text: "Notifications",
      path: "/notifications",
      icon: <NotificationsIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/notifications"),
    },
    {
      id: 3,
      text: "Products",
      path: "/products",
      icon: <DonutLargeIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/products"),
    },
    {
      id: 4,
      text: "Orders",
      path: "/orders",
      icon: <LabelImportantIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/orders"),
    },
    {
      id: 5,
      text: "Reports",
      path: "/reports",
      icon: <ListAltIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/reports"),
    },
    {
      id: 6,
      text: "Staff",
      path: "/staff",
      icon: <PeopleIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/staff"),
    },
    {
      id: 7,
      text: "Profile",
      path: "/profile",
      icon: <AccountBoxIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/profile"),
    },
    {
      id: 8,
      text: "Settings",
      path: "/settings",
      icon: <SettingsIcon />,
      pathname: props.location.pathname,
      onClick: () => props.history.push("/settings"),
    },
  ];
};

export default MenuItems;
