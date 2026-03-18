import { OrderList } from "@/components/pages/OrderList";
import { Page404 } from "@/components/pages/Page404";

export const homeRoutes = [
  {
    index: true,
    element: <OrderList />,
  },

  {
    path: "*",
    element: <Page404 />,
  },
];
