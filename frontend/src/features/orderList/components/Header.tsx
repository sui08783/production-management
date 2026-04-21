import { Flex, Heading, Link, Spacer, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");

  // ユーザーのログイン状態を取得し、ログインしている状態ならユーザー名を取得する。
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");

      if (res.ok) {
        const name = await res.text();
        setUsername(name);
      }
    };

    fetchUser();
  }, []);

  //ログアウト処理
  //ログアウトしたらログイン画面へ遷移
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  };

  const menu = [
    { label: "工程一覧", path: "/" },
    { label: "工程追加", path: "/add" },
    { label: "週間スケジュール", path: "/kanban" },
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
          <Box display="flex" alignItems="center" gap={3}>
            <Box px={3} py={1} bg="gray.100" borderRadius="full" fontSize="sm" color="gray.700">
              ログイン中：{username}
            </Box>

            <Button onClick={logout} size="sm" variant="outline" colorPalette="gray" borderRadius="md">
              ログアウト
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
