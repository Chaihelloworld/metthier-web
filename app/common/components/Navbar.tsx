'use client';

import { memo, type FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dashboardMenu from '@/app/modules/Dashboard/menus/menu';
import taskBoardMenu from '@/app/modules/TaskBoard/menus/menu';

const menus = [dashboardMenu, taskBoardMenu];

const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center h-14 gap-8">
        <Link href="/dashboard" className="text-lg font-bold text-blue-600">
          Metthier
        </Link>
        <div className="flex gap-1">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === menu.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
