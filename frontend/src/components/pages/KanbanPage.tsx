import { Kanban } from "../kanban/Kanban";
import { HeaderLayout } from "../templates/HeaderLayout";

export const KanbanPage = () => {
  return (
    <HeaderLayout>
      <Kanban />
    </HeaderLayout>
  );
};
