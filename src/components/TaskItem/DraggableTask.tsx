import { ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

interface IDraggableTaskProps {
  id: string;
  children?: ReactNode;
}

export const DraggableTask: React.FC<IDraggableTaskProps> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    touchAction: "none",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
