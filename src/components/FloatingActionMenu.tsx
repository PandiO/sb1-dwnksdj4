import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface ActionItem {
  label: string;
  onClick: (item: any) => void;
  icon?: React.ReactNode;
}

interface FloatingActionMenuProps {
  actions: ActionItem[];
  item: any;
  triggerRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}

interface ActionMenuTriggerProps {
  onClick: () => void;
}

export function FloatingActionMenu({ actions, item, triggerRef, isOpen, onClose }: FloatingActionMenuProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Position the menu relative to the trigger button
      setPosition({
        x: rect.right + scrollX - 200, // Offset by menu width to align right
        y: rect.top + scrollY
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        setPosition({
          x: rect.right + scrollX - 200, // Offset by menu width to align right
          y: rect.top + scrollY
        });
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-white rounded-lg shadow-lg py-1 min-w-[200px] border border-gray-200"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            action.onClick(item);
            onClose();
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
        >
          {action.icon && <span className="text-gray-500">{action.icon}</span>}
          <span>{action.label}</span>
        </button>
      ))}
    </div>,
    document.body
  );
}

export const ActionMenuTrigger = forwardRef<HTMLButtonElement, ActionMenuTriggerProps>(
  ({ onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>
    );
  }
);

ActionMenuTrigger.displayName = 'ActionMenuTrigger';