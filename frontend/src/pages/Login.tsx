import { Box, Button, Field, Input, Stack, Heading, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { FiClipboard, FiColumns, FiUsers, FiShield } from "react-icons/fi";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
      credentials: "include",
    });

    if (response.ok) {
      toaster.create({
        description: "ログインに成功しました",
        type: "success",
        closable: true,
      });
    } else {
      toaster.create({
        description: "ログインに失敗しました。ユーザー名またはパスワードが違います。",
        type: "error",
        closable: true,
      });
    }

    if (response.ok) {
      console.log("ログイン成功");
      navigate("/");
    } else {
      console.log("ログイン失敗");
    }
  };

  const handleSubmitGuest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: "guest",
        password: "guest",
      }),
      credentials: "include",
    });

    if (response.ok) {
      toaster.create({
        description: "ログインに成功しました",
        type: "success",
        closable: true,
      });
      console.log("ログイン成功");
      navigate("/");
    } else {
      console.log("ログイン失敗");
      toaster.create({
        description: "ログインに失敗しました。ユーザー名またはパスワードが違います。",
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={8}>
      {/* 左側 */}
      <Box flex={1} maxW="500px" pr={16}>
        <Heading size="3xl" mb={6}>
          バネ製造工程管理アプリ
        </Heading>

        <Text fontSize="xl" fontWeight="bold" mb={4}>
          製造工程を見える化し、
          <br />
          現場の生産性を向上させる
        </Text>

        <Text color="gray.600" mb={8}>
          実際の製造現場で感じた情報共有の課題を解決するために
          <br />
          開発した工程管理アプリです。
        </Text>

       <VStack align="stretch" gap={4}>
  <Box
    p={4}
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack mb={2}>
      <FiClipboard size={22} />
      <Text fontWeight="bold">工程管理</Text>
    </HStack>

    <Text color="gray.600" fontSize="sm">
      工程の登録・編集・削除
    </Text>
  </Box>

  <Box
    p={4}
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack mb={2}>
      <FiColumns size={22} />
      <Text fontWeight="bold">進捗管理</Text>
    </HStack>

    <Text color="gray.600" fontSize="sm">
      カンバン方式で進捗を可視化
    </Text>
  </Box>

  <Box
    p={4}
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack mb={2}>
      <FiUsers size={22} />
      <Text fontWeight="bold">情報共有</Text>
    </HStack>

    <Text color="gray.600" fontSize="sm">
      リアルタイムで工程情報を共有
    </Text>
  </Box>

  <Box
    p={4}
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    border="1px solid"
    borderColor="gray.100"
  >
    <HStack mb={2}>
      <FiShield size={22} />
      <Text fontWeight="bold">権限管理</Text>
    </HStack>

    <Text color="gray.600" fontSize="sm">
      管理者・一般ユーザーに対応予定
    </Text>
  </Box>
</VStack>
      </Box>

      {/* ログインフォーム */}
      <Box w="500px" bg="white" p={10} borderRadius="2xl" boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Heading size="lg" textAlign="center">
              ログイン
            </Heading>

            <Field.Root>
              <Field.Label>ユーザー名</Field.Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>パスワード</Field.Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field.Root>

            <Button type="submit" colorPalette="blue">
              ログイン
            </Button>
          </Stack>
        </form>

        <Box mt={5}>
          <form onSubmit={handleSubmitGuest}>
            <Button type="submit" colorPalette="green" width="100%">
              ゲストログイン
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
