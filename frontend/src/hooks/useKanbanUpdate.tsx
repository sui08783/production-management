export const useKanbanUpdate = () => {
  type kanbanUpdateData = {
    cardId: number;
    machine: string;
    day: string;
    newPosition: number;
  };

  const updateData = async ({ cardId, machine, day, newPosition }: kanbanUpdateData) => {
    try {
      const res = await fetch(`http://localhost:8080/kanban/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          machineName: machine ?? "UNASSIGNED",
          days: day ?? "UNASSIGNED",
          position: newPosition,
        }),
      });

      if (!res.ok) {
        throw new Error("更新失敗");
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    updateData,
  };
};
