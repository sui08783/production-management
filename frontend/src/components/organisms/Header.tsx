import { Flex, Heading, Link, Spacer, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "工程一覧", path: "/orders" },
    { label: "工程追加", path: "/add" },
    { label: "カンバン", path: "/kanban" },
  ];

  return (
    <Box as="header" bg="white" borderBottom="1px solid" borderColor="gray.200" boxShadow="sm">
      <Flex h="60px" px={6} align="center" maxW="1400px" mx="auto">
        <Heading size="md" cursor="pointer" onClick={() => navigate("/")}>
          工程管理アプリ
        </Heading>

        <Spacer />

        <Flex gap={6}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} onClick={() => navigate(item.path)} fontWeight={isActive ? "bold" : "normal"} color={isActive ? "blue.500" : "gray.600"} _hover={{ textDecoration: "none", color: "blue.400" }}>
                {item.label}
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
