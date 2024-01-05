import React  from "react";
import { Outlet} from "react-router-dom";
import { Box } from "@mui/material";

 const Admin = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, pt:4 }}>
      
      <div className="content">
        <Outlet />
      </div>
    </Box>
  );
};
export default Admin;