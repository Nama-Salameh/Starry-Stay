import React, { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BedIcon from "@mui/icons-material/Bed";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import topBarLogo from "../../../../assets/images/topbarLogo.jpeg";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import { removeToken } from "../../../../utils/storageUtils/tokenStorage/TokenStorage";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("cities");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };
  const handleLogout = () => {
    removeToken();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={topBarLogo}
            alt={"Starry Stay logo"}
            className={style.topBarLogo}
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: theme.palette.secondary.main }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Link
              to="/admin/hotels"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={selectedOption === "hotels"}
                onClick={() => handleOptionClick("hotels")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedOption === "hotels"
                      ? `${theme.palette.secondary.main} !important`
                      : theme.palette.primary.main,

                  color:
                    selectedOption === "hotels"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.light,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      selectedOption === "hotels"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                >
                  <ApartmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Hotels"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedOption === "hotels"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/admin/rooms"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={selectedOption === "rooms"}
                onClick={() => handleOptionClick("rooms")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedOption === "rooms"
                      ? `${theme.palette.secondary.main} !important`
                      : theme.palette.primary.main,
                  color:
                    selectedOption === "rooms"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.light,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      selectedOption === "rooms"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                >
                  <BedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Rooms"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedOption === "rooms"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/admin/cities"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={selectedOption === "cities"}
                onClick={() => handleOptionClick("cities")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedOption === "cities"
                      ? `${theme.palette.secondary.main} !important`
                      : theme.palette.primary.main,

                  color:
                    selectedOption === "cities"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.light,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      selectedOption === "cities"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                >
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Cities"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedOption === "cities"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={selectedOption === "logout"}
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedOption === "logout"
                      ? `${theme.palette.secondary.main} !important`
                      : theme.palette.primary.main,

                  color:
                    selectedOption === "logout"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.light,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      selectedOption === "logout"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedOption === "logout"
                        ? theme.palette.primary.main
                        : theme.palette.secondary.light,
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
