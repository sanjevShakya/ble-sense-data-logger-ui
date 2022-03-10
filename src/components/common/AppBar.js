import * as React from "react";
import Box from "@mui/material/Box";
import { routes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

const routesDefs = {
  subjects: {
    link: routes.SUBJECT.url,
    name: "Subjects",
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

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, }}
          >
            G<DirectionsRunIcon />
            IT DETECTION
          </Typography>
          <Box sx={{ flexGrow: 1 }} style={{display: 'flex'}}>
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
