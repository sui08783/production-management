
export const useDeleteOrder = () => {
  const deleteOrder = async (id:number) => {
    if (id == null) return;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("削除失敗");
      }
      return true;
    } catch (err) {
      return false;
    }
  };
  return { deleteOrder };
};
