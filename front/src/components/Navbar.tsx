import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "../styles/Navbar.scss";
import { alpha, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUserInfo } from "../redux/account/actions";
import { useNavigate } from "react-router-dom";

const pages = ["게임시작", "로그인", "Sunghyun"];

const RootStyle = styled(AppBar)(() => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  backgroundColor: alpha(grey[900], 0.72),
  // backgroundColor: "rgb(125, 174, 136)",
  // [theme.breakpoints.down("sm")]: {},
}));

const ToolbarStyle = styled(Toolbar)({
  height: 80,
  padding: "0px !important",
  letterSpacing: "0px",
  width: "100%",
});
interface NavbarProps {
  color?: string,
}


const Navbar = ({color}:NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.account.isLogin);
  const profileImg = useSelector((state: any) => state.account.profileImg);
  const nickname = useSelector((state: any) => state.account.nickname);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const userId = useSelector((state: any) => state.account.userId);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onClickHandler = async () => {
    try {
        localStorage.clear();
        dispatch(resetUserInfo());
        navigate("/");
      } catch (e) {}
    };
  return (
    <RootStyle sx={{ backgroundColor: !!color ? color : "" }}>
      <Container maxWidth="xl" className="myNav">
        <ToolbarStyle disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" }, flexGrow: 1 }} className="Logo">
            <Link to="/" className="cookie">
              Forest Rap Battle
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            Logo
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <Link>{page}</Link>
              </Button>
            ))} */}
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to={isLogin ? "/game" : "/login"}>게임시작</Link>
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/rank">랭킹</Link>
            </Button>
            {isLogin || (
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/login">로그인</Link>
              </Button>
            )}
            {!isLogin || (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  onClickHandler();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/login">로그아웃</Link>
              </Button>
            )}
            {isLogin || (
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                <Link to="/signup">회원가입</Link>
              </Button>
            )}
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
              <Link to={`/profile/${userId}`}>{nickname}</Link>
            </Button>
          </Box>

          {!isLogin || (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Go to Profile">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" className="navAvatar">
                    <Link to={`/profile/${userId}`}>
                      <img src={profileImg} alt="dd" className="navImage" />
                    </Link>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </ToolbarStyle>
      </Container>
    </RootStyle>
  );
};

export default Navbar;

