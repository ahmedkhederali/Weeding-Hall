import React, { ReactNode, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  useToast,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GoReport } from "react-icons/go";

import { ReactText } from "react";
import { getUserByID } from "../services/AuthServices";
const admin = localStorage.getItem("admin") === "admin" ? true : false;
const user = localStorage.getItem("admin") === "user" ? true : false;

const LinkItems = [
  {
    name: admin ? "Dashboard" : "Home",
    icon: admin ? AiFillDashboard : FiHome,
    loc: "/",
  },
  {
    name: admin ? "Create Hall" : "Trending",
    icon: admin ? FiHome : FiTrendingUp,
    loc: admin ? "/createhall" : "/trend",
  },
  {
    name: admin ? "All Hall" : "Explore",
    icon: admin ? MdOutlineMapsHomeWork : FiStar,
    loc: admin ? "/adminallhall" : "/explore",
  },
  {
    name: admin ? "All Report" : "Favourites",
    icon: admin ? GoReport : FiStar,
    loc: admin ? "/adminallreport" : "/faviourt",
  },
  { name: "Settings", icon: FiSettings, loc: "/y" },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const toast = useToast();

  const [refresh, setRefresh] = useState(false);
  const currentuser = localStorage.getItem("currentuser");
  useEffect(() => {
    getUserByID(currentuser)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "Wrong Process",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, [refresh]);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} loc={link.loc}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, loc, ...rest }) => {
  return (
    <Link
      to={loc}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

function logOut() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  localStorage.removeItem("currentuser");
  window.location.href = "/login";
}
const MobileNav = ({ onOpen, user, ...rest }) => {
  const colors2 = useColorModeValue("black.300", "white.200");
  const usertoken = localStorage.getItem("admin") === "user" ? true : false;
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "5" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <Box borderRadius={9} position={"relative"}>
                <Box
                  position={"absolute"}
                  right={0}
                  color="red"
                  fontWeight={"bold"}
                >
                  51
                </Box>
                <IconButton
                  size="lg"
                  variant="ghost"
                  aria-label="open menu"
                  icon={<FiBell />}
                />
              </Box>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {
                // while used when there is a notification to check making loading
                false && <Skeleton height="20px" />
              }
              {[1, 2, 3].map((item, index) => (
                <MenuItem key={index}>
                  <Flex>
                    <Avatar src="https://bit.ly/sage-adebayo" />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        Segun Adebayo
                        <Badge ml="1" colorScheme="green">
                          New
                        </Badge>
                      </Text>
                      <Text fontSize="sm">UI Engineer</Text>
                    </Box>
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user.avatar && user.avatar.url} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{`${user.firstname} ${user.lastname}`}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              {usertoken && (
                <>
                  <Link to="/reports">
                    <MenuItem>Reports</MenuItem>
                  </Link>
                  <Link to="/bookpage">
                    <MenuItem>Booked</MenuItem>
                  </Link>
                </>
              )}
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
