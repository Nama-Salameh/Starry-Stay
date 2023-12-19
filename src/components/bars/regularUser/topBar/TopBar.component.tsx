import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import topBarLogo from "../../../../assets/images/topbarLogo.jpeg";
import style from "./TopBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/system";
import { isLoggedIn } from "../../../../utils/TokenUtils";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

export default function TopBar({ items = [] }: { items?: string[] }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className={style.drawerContainer}>
      <img
        src={topBarLogo}
        className={style.topBarLogoDrawer}
        alt="top bar logo"
      />
      <Divider className={style.deviderDrawer} />

      {items.length > 0 && (
        <List>
          {items.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <Box className={style.topBar}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "70px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={style.menuIcon}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img
              src={topBarLogo}
              className={style.topBarLogo}
              alt="top bar logo"
            />
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {items.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "var(--mui-pallete-secondary-main)",
                  textTransform: "none",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {isLoggedIn() ? (
            <Button onClick={() => navigate("/checkout")}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{
                  color: theme.palette.secondary.main,
                }}
              />
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
