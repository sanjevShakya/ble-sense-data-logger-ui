import * as React from "react";
import Box from "@mui/material/Box";
import { routes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
const pages = ["Subjects", "Classes"];

const routesDefs = {
  subjects: {
    link: routes.SUBJECT.url,
    name: "Subjects",
  },
  classes: {
    link: routes.CLASSES.url,
    name: "Classes",
  },
};

const ResponsiveAppBar = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            G<DirectionsRunIcon />
            IT DETECTION
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            G<DirectionsRunIcon />
            IT DETECTION
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {Object.keys(routesDefs).map((routeKey, index) => (
              <Button
                key={index}
                onClick={() => handleNavigation(routesDefs[routeKey].link)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {routesDefs[routeKey].name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
