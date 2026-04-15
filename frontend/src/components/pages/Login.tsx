import { Box, Button, Field, Input, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";

export const Login = ({ onSubmit }: { onSubmit: (username: string, password: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box maxW="400px" mx="auto" mt="100px">
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Heading size="lg"  textAlign="center">ログイン</Heading>

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
