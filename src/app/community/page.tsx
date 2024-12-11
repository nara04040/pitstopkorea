'use client';

import { Tab } from '@headlessui/react';
import CommunityList from '@/components/community/CommunityList';
import CommunitySearch from '@/components/community/CommunitySearch';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CommunityPage() {
  const categories = {
    '자유게시판': [],
    '팀 게시판': [],
    '드라이버 게시판': [],
    '기술 토론': []
  };

  return (
    <main className="min-h-screen pt-20 px-4 md:px-10">
      <div className="max-w-screen-2xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">커뮤니티</h1>
          <p className="text-text-secondary">F1 팬들과 함께 이야기를 나누어보세요</p>
        </div>

        {/* 검색 바 */}
        <CommunitySearch />

        {/* 탭 네비게이션 */}
        <div className="mt-8">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-bg-secondary p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-offset-2  focus:outline-none ',
                      selected
                        ? 'bg-f1-red text-white shadow'
                        : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-bg-primary p-3',
                    ' focus:outline-none '
                  )}
                >
                  <CommunityList category={Object.keys(categories)[idx]} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </main>
  );
} 