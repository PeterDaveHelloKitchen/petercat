'use client';

import React, { useMemo } from 'react';
import HomeHeader from '@/components/HomeHeader';
import Markdown from '@/components/Markdown';
import { useGlobal } from '@/app/contexts/GlobalContext';
import AgreementZhCN from '../../.kiwi/zh-CN/agreement.md';
import AgreementEN from '../../.kiwi/en/agreement.md';
import AgreementJA from '../../.kiwi/ja/agreement.md';
import AgreementKO from '../../.kiwi/ko/agreement.md';
import AgreementZhTW from '../../.kiwi/zh-TW/agreement.md';

export default function Agreement() {
  const { language } = useGlobal();

  const markdownContent = useMemo(() => {
    switch (language) {
      case 'zh-CN':
        return AgreementZhCN;
      case 'zh-TW':
        return AgreementZhTW;
      case 'ja':
        return AgreementJA;
      case 'ko':
        return AgreementKO;
      case 'en':
        return AgreementEN;
      default:
        return AgreementEN;
    }
  }, [language]);
  return (
    <div className="section bg-black">
      <HomeHeader />
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
        <Markdown markdownContent={markdownContent} />
      </div>
    </div>
  );
}
