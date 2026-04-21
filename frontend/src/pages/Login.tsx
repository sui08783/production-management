import { Box, Button, Field, Input, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

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

  return (
    <Box maxW="400px" mx="auto" mt="100px">
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Heading size="lg" textAlign="center">
            ログイン
          </Heading>

          <Field.Root>
            <Field.Label>ユーザー名</Field.Label>
            <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Field.Root>

          <Field.Root>
            <Field.Label>パスワード</Field.Label>
            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field.Root>

          <Button type="submit" colorPalette="blue" width="100%">
            ログイン
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
