import { useState } from "react";

export const useKanbanUpdate = () => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("");
  const [days, setDays] = useState("");

  const updateData = async (id, machine, day, position) => {
    try {
      const res = await fetch(`http://localhost:8080/kanban/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          machineName: machine ?? "UNASSIGNED",
          days: day ?? "UNASSIGNED",
          position: position,
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
    updateData,
    editingId,
    setEditingId,
    machineName,
    setMachineName,
    status,
    setStatus,
    days,
    setDays,
  };
};
