import { memo } from "react";

import { Route, Routes } from "react-router-dom";
import { Page404 } from "@/pages/Page404";
import { AddOrder } from "../pages/AddOrder";
import { OrderList } from "@/pages/OrderList";
import { Kanban } from "@/pages/Kanban";
import { Login } from "@/pages/Login";
export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<OrderList />}></Route>
      <Route path="/add" element={<AddOrder />}></Route>
      <Route path="/kanban" element={<Kanban />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
});
