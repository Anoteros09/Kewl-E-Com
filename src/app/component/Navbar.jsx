"use client";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import useCartStore from "../store/cart";
import Link from "next/link";
import useGlobalStore from "../store/global";
import { usePathname } from "next/navigation";

const pages = ["Home", "Products", "Orders", "Profile"];
const pageLinks = {
  Home: "/",
  Products: "/products",
  Cart: "/cart",
  Orders: "/orders",
  Profile: "/profile",
};

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, isSignedIn } = useUser();
  const { fetchUserCart, total } = useCartStore((state) => state);
  const { setIsLoading, isLoading } = useGlobalStore((state) => state);
  const pathname = usePathname();

  useEffect(() => {
    if (isSignedIn) {
      fetchUserCart(user.id);
      setIsLoading(false);
    }
  }, [isSignedIn, user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "neutral2.main" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KEWL<span className="text-xl m-auto">.com</span>
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
                  <Typography
                    href={pageLinks[page]}
                    onClick={() =>
                      setIsLoading(pathname != pageLinks[page] && true)
                    }
                    component="a"
                    sx={{ textAlign: "center", color: "white" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KEWL<span className="text-xl my-auto">.com</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={pageLinks[page]}
                onClick={() =>
                  setIsLoading(pathname != pageLinks[page] && true)
                }
                className={`py-3 flex items-center px-6 rounded-t-lg
                  ${
                    pathname === pageLinks[page]
                      ? "text-secondary1 border-b-2 border-primary shadow-md"
                      : "text-white"
                  } 
                  hover:border-b-2 hover:border-primary hover:shadow-lg hover:bg-neutral2`}
                sx={{ my: 2, color: "white", display: "block", mr: 5 }}
              >
                {page}
              </Link>
            ))}
            <SearchBar />
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "6rem",
            }}
          >
            <SignedOut>
              <SignInButton className="bg-primary2 p-1 rounded-lg text-black font-semibold" />
            </SignedOut>
            <SignedIn>
              <Link
                href="/cart"
                onClick={() =>
                  setIsLoading(pathname != pageLinks["Cart"] && true)
                }
              >
                <Badge badgeContent={total} color="primary">
                  <ShoppingCartTwoToneIcon />
                </Badge>
              </Link>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
      {isLoading && <LinearProgress color="secondary" />}
    </AppBar>
  );
}

export default Navbar;
