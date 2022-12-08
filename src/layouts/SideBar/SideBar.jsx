import React from "react";
import {
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CardHeader,
  Typography,
} from "@mui/material";
import {
  Assessment,
  Help,
  History,
  Home,
  Message,
  Receipt,
  Settings,
  Wallet,
} from "@mui/icons-material";

export default function SideBar() {
  return (
    <Stack spacing={2} width={300}>
      <CardHeader
        disableTypography={true}
        avatar={
          <Avatar
            sx={{ width: 55, height: 55 }}
            alt="Logo"
            src={require("../../assets/images/logo.png")}
          />
        }
        title={<Typography variant="h4">RISSC Bank</Typography>}
      />

      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "background.paper",
        }}
        aria-label="contacts"
      >
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Wallet />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Get Help" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
