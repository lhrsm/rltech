import React from 'react';
import { clsx } from 'clsx';

interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className,
}) => {
  return (
    <div
      role="tablist"
      className={clsx(
        'inline-flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800/80 rounded-lg overflow-x-auto max-w-full',
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={clsx(
              'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none select-none',
              isActive
                ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent'
            )}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={clsx(
                  'text-[10px] font-mono px-1.5 py-0.2 rounded',
                  isActive
                    ? 'bg-zinc-700 text-zinc-200'
                    : 'bg-zinc-800/80 text-zinc-400'
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
