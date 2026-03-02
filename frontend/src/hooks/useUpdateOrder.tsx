import { useState } from "react";

export const useUpdateOrder = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productName, setProductName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [response, setResponse] = useState("");

  const updateData = async () => {
    if (editingId == null) return;

    try {
      const res = await fetch(`http://localhost:8080/orders/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: productName, machineName: machineName, deadline: deadline, quantity: quantity }),
      });

      if (!res.ok) {
        throw new Error("更新失敗");
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  return { updateData, editingId, setEditingId, productName, setProductName, machineName, setMachineName, deadline, setDeadline, quantity, setQuantity, response, setResponse };
};
