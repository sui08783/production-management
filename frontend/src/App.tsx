import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { Router } from "./router/Router";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function AppInner() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ログインページならチェックしない
    if (location.pathname === "/login") {
      setIsLoading(false);
      return;
    }

    const checkLogin = async () => {
      const res = await fetch("/api/me", {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login"); 
        return;
      }

      setIsLoading(false);
    };

    checkLogin();
  }, [location.pathname]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return <Router />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}