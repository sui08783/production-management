import { useDraggable } from "@dnd-kit/core";

/**
 *
 * dnd-kitのuseDraggableのためのコンポーネント
 * これでラップした要素に、ドラッグ機能を付与する
 *
 * @param props.id - ドラッグの対象になっているものを区別するためのID
 *
 * @param props.children -ドラッグの対象
 */

type Props = {
  id: string | number;
  children: React.ReactNode;
};

export const Draggable = (props: Props) => {
  const { attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });
  

  return (
    <button ref={setNodeRef}  {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
