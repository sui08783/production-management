import { useState } from "react";

export const useKanbanComplete = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const checkComplete = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/kanban/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      if (!res.ok) {
        throw new Error("更新失敗");
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    checkComplete,
    editingId,
    setEditingId,
    status,
    setStatus,
  };
};
