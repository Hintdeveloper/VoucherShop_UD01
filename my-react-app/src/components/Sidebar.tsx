import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const Sidebar: React.FC = () => {
  return (
    <div>
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
        <ListItem button>
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText primary="Voucher" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
