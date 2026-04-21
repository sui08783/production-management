import { useDroppable } from "@dnd-kit/core";

/**
 *
 * dnd-kit
 *  ドロップ可能な領域を定義するためのコンポーネント
 * 
 * 
 * @param props.id - ドロップ可能なエリアを識別するためのID
 *
 * @param props.children - ドロップ領域ろして扱う要素
 *
 */

type Props = {
  id: string | number;
  children: React.ReactNode;
};

export const Droppable = (props: Props) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} >
      {props.children}
    </div>
  );
};
