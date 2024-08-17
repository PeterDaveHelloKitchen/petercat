'use client';
import React from 'react';
import { useBot } from '@/app/contexts/BotContext';

import 'react-toastify/dist/ReactToastify.css';
import HomeIcon from '@/public/icons/HomeIcon';
import { useBotRAGChunkList } from '@/app/hooks/useBot';
import { RAGDoc } from '@/app/services/BotsController';
import FullPageSkeleton from '@/components/FullPageSkeleton';
import KnowledgeBtn from './KnowledgeBtn';

type IProps = {
  botId: string;
  goBack: () => void;
};

const CardList = ({ data }: { data: RAGDoc[] }) => {
  const Card = ({ update_timestamp, content, file_path }: RAGDoc) => {
    return (
      <div className="rounded-[8px] w-[442px] h-[240px] p-[8px] bg-white">
        <div className="rounded-[4px] h-[154px] w-full p-1 bg-[#F3F4F6] mb-3 overflow-hidden overflow-ellipsis">
          <p className="line-clamp-5">{content}</p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{file_path}</h2>
          <span className="bg-[#E5E7EB] text-[12px] rounded-[4px] p-[4px] color-[#4B5563]">
            {content?.length} 字符
          </span>
        </div>
        <p className="text-sm text-gray-600">更新于 {update_timestamp}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap justify-between gap-4">
      {data.map((card, index) => (
        <div key={index} className="w-full md:w-1/3 p-2">
          <Card {...card} />
        </div>
      ))}
    </div>
  );
};

export default function Knowledge({ botId, goBack }: IProps) {
  const { botProfile } = useBot();
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data: RagDocData, isLoading: isListLoading } = useBotRAGChunkList(
    botId,
    pageSize,
    pageNumber,
  );
  return (
    <div className="flex h-screen w-full flex-col bg-[#F3F4F6]">
      <div className="relative flex h-[72px] w-full items-center justify-between gap-2 border-[0.5px] border-gray-200 px-6 flex-shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              goBack();
            }}
          >
            <HomeIcon />
            <span>{botProfile.name}</span>
          </span>
          <span>/</span>
          <span>知识库分段</span>
        </div>
        <div className="flex items-center gap-2">
          <KnowledgeBtn botId={botId} onClick={() => {}} mode={'pageHeader'} />
        </div>
      </div>
      <div className="p-10">
        {RagDocData ? (
          <CardList data={RagDocData.rows}></CardList>
        ) : (
          <FullPageSkeleton />
        )}
      </div>
    </div>
  );
}