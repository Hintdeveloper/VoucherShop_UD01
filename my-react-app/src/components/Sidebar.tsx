import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const handleclick = () => {};

  return (
    <Box sx={{ marginTop: "60px" }}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <SportsSoccerIcon />
          </ListItemIcon>
          <ListItemText primary="Football" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SportsBasketballIcon />
          </ListItemIcon>
          <ListItemText primary="Basketball" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText primary="Running" />
        </ListItem>
        <Link to="/addvoucher" style={{ color: "black" }}>
          <ListItem button onClick={handleclick}>
            <ListItemIcon>
              <CardGiftcardIcon />
            </ListItemIcon>
            <ListItemText primary="Voucher" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
