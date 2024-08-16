import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateVoucherForm } from "./components/CreateVoucherForm";
import HomePage from "./components/HomePage";
import ProductListBought from "./components/ProductListBought";
import store from "./components/redux/Store";
import LoginPage from "./login";
import WalletContextProvider from "./wallet";
import LandingPage from "./components/LandingPage";


/*
const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            List Voucher
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <h1>Football</h1>
        <ProductList />
      </Box>
    </Box>
  );
}
*/
function App() {
  return (
    <WalletContextProvider>
    <Provider store={store}>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/register" Component={LoginPage} />
        <Route path="/addvoucher" Component={CreateVoucherForm} />
        {/* <Route path="/boughtlist" Component={ProductListBought} /> */}
        <Route path="/list" Component={HomePage} />
      </Routes>
    </Provider>
    </WalletContextProvider>
  );
}

export default App;
