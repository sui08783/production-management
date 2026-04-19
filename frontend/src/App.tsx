// App.tsx
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //ログインページならチェックしない
    if (window.location.pathname === "/login") {
      setIsLoading(false);
      return;
    }

    const checkLogin = async () => {
      const res = await fetch("/api/me");

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
