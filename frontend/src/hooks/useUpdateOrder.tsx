import { useState } from "react";

export const useUpdateOrder = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productName, setProductName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [response, setResponse] = useState("");

  const updateData = async () => {
    if (editingId == null) return false;

    try {
      const res = await fetch(`/api/orders/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: productName, machineName: machineName, status: status, deadline: deadline, quantity: quantity }),
      });

      if (!res.ok) {
        throw new Error("更新失敗");
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  return { updateData, editingId, setEditingId, productName, setProductName, machineName, setMachineName, status, setStatus, deadline, setDeadline, quantity, setQuantity, response, setResponse };
};
