import { memo } from "react";

import { Route, Routes } from "react-router-dom";
import { Page404 } from "@/components/pages/Page404";
import { AddOrder } from "../components/pages/AddOrder";
import { OrderList } from "@/components/pages/OrderList";
import { Kanban } from "@/components/pages/Kanban";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<OrderList />}></Route>
      <Route path="/add" element={<AddOrder />}></Route>
      <Route path="/orders" element={<OrderList />}></Route>
      <Route path="/kanban" element={<Kanban />}></Route>

      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
});
