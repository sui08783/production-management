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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
