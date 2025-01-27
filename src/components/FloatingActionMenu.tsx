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
  className?: string;
}

export function FloatingActionMenu({ actions, item, triggerRef, isOpen, onClose }: FloatingActionMenuProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        const viewportHeight = window.innerHeight;
        const menuHeight = menuRef.current?.offsetHeight || 0;

        // Calculate available space above and below
        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;

        // Determine if menu should appear above or below the trigger
        const showAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;

        // Set maximum height based on available space
        const availableHeight = showAbove ? spaceAbove : spaceBelow;
        setMaxHeight(Math.min(availableHeight - 20, 300)); // 20px padding, max 300px

        // Calculate position
        setPosition({
          x: Math.min(rect.right + scrollX - 200, window.innerWidth - 220), // Prevent overflow right
          y: showAbove 
            ? rect.top + scrollY - menuHeight - 5 // Position above with 5px gap
            : rect.bottom + scrollY + 5 // Position below with 5px gap
        });
      };

      updatePosition();
      // Use ResizeObserver to detect container size changes
      const resizeObserver = new ResizeObserver(updatePosition);
      if (menuRef.current) {
        resizeObserver.observe(menuRef.current);
      }

      return () => resizeObserver.disconnect();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      // Only handle scroll events from parent containers, not the menu itself
      if (menuRef.current?.contains(event.target as Node)) return;
      
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        
        // Check if trigger is still in viewport
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          onClose();
          return;
        }

        // Update position to maintain relative position to trigger
        setPosition(prev => ({
          x: prev.x,
          y: rect.bottom + window.scrollY + 5
        }));
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

    // Use capture phase for scroll to handle all scrolling containers
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
      className="fixed bg-white rounded-lg shadow-lg py-1 min-w-[200px] border border-gray-200 overflow-y-auto"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        maxHeight: `${maxHeight}px`,
        zIndex: 9999, // High z-index to float above other elements
      }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            action.onClick(item);
            onClose();
          }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
        >
          {action.icon && <span className="text-gray-500 flex-shrink-0">{action.icon}</span>}
          <span className="truncate">{action.label}</span>
        </button>
      ))}
    </div>,
    document.body
  );
}

export const ActionMenuTrigger = forwardRef<HTMLButtonElement, ActionMenuTriggerProps>(
  ({ onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`invisible group-hover:visible p-2 rounded-full hover:bg-gray-100 transition-colors ${className || ''}`}
        aria-label="Open actions menu"
      >
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>
    );
  }
);

ActionMenuTrigger.displayName = 'ActionMenuTrigger';