import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme, useMediaQuery } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 250;

const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dashboardData, setDashboardData] = useState({
    notifications: 2,
    messages: 2,
    cartItems: 2,
    settingsUpdates: 2,
  });

  const [adminData, setAdminData] = useState({
    name: 'Admin',
    profilePhoto: 'https://via.placeholder.com/40',
  });

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://api.example.com/dashboard-data'); // Replace with your API URL
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await fetch('https://api.example.com/admin-data'); // Replace with your API URL
        const data = await response.json();
        setAdminData({
          name: data.name,
          profilePhoto: data.profilePhoto,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchDashboardData();
    fetchAdminData();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Sidebar />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isSmallScreen ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: isSmallScreen ? 0 : `${drawerWidth}px`,
          backgroundColor: 'white',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: isSmallScreen ? 2 : 3,
          }}
        >
          {isSmallScreen && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: isSmallScreen ? '100%' : '500px',
              maxWidth: '500px',
            }}
            InputProps={{
              endAdornment: searchValue === '' && (
                <InputAdornment position="end">
                  <FontAwesomeIcon icon={faSearch} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <div className="icon-container">
              <NotificationsNoneIcon />
              {dashboardData.notifications > 0 && (
                <span className="badge">{dashboardData.notifications}</span>
              )}
            </div>
            <div className="icon-container">
              <MailOutlineIcon />
              {dashboardData.messages > 0 && (
                <span className="badge">{dashboardData.messages}</span>
              )}
            </div>
            <div className="icon-container">
              <ShoppingCartIcon />
              {dashboardData.cartItems > 0 && (
                <span className="badge">{dashboardData.cartItems}</span>
              )}
            </div>
            <div className="icon-container">
              <SettingsIcon />
              {dashboardData.settingsUpdates > 0 && (
                <span className="badge">{dashboardData.settingsUpdates}</span>
              )}
            </div>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Barlow' }}>
              Hello, {adminData.name || 'Admin'}
            </Typography>
            <Avatar
              alt="Admin Profile"
              src={adminData.profilePhoto || 'https://via.placeholder.com/40'}
              sx={{ width: 40, height: 40 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default NavBar;
