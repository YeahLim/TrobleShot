"use client";
import { getMostTags, getTrouble } from "@/api/trouble";
import CardContentL from "@/components/CardContentL";
import { useLoginStore } from "@/stores/useLoginStore";
import { SearchParams } from "@/types/TroubleType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import qs from "qs";
import axios from "axios";
import { getOneWeekAgoDate, getToday } from "@/utils/getDate";
import BoardItem from "@/components/BoardItem";
import Link from "next/link";
import CardContentLSkeleton from "@/components/Skeletons/CardContentLSkeleton";
import SearchbarSkeleton from "@/components/Skeletons/SearchbarSkeleton";
import dynamic from "next/dynamic";
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
const Searchbar = dynamic(() => import("@/components/Searchbar/Searchbar"), {
  loading: () => <SearchbarSkeleton />,
});

export default function CommunityContents() {
  const [mounted, setMounted] = useState<boolean>(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    setMounted(true);
  }, []);

  const { user } = useLoginStore();
  const [options, setOptions] = useState<SearchParams>({
    ...(user && { loginSeq: user.member.seq }),
  });

  const { data: tags, error } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const data = await getMostTags(user!.member.seq);
      return data;
    },
    enabled: !!user,
  });

  const { data: contents1, isLoading: loading1 } = useQuery({
    queryKey: ["contents1"],
    queryFn: async () => {
      if (tags && tags?.tagList.length > 1) {
        const data = await getTrouble({ tags: [tags.tagList[0]], pageSize: 3 });
        return data;
      }
    },
    enabled: Boolean(tags),
  });
  const { data: contents2, isLoading: loading2 } = useQuery({
    queryKey: ["contents2"],
    queryFn: async () => {
      if (tags && tags?.tagList.length > 1) {
        const tag = [tags.tagList[0]];
        const data = await getTrouble({ tags: [tag[1]], pageSize: 3 });
        return data;
      }
    },
    enabled: Boolean(tags),
  });
  const { data: hotBoard } = useQuery({
    queryKey: ["hotBoard"],
    queryFn: async () => {
      const data = await getTrouble({
        order: 1,
        pageSize: 10,
        startTime: getOneWeekAgoDate(),
        endTime: getToday(),
        ...(user && { loginSeq: user.member.seq }),
      });
      return data;
    },
  });
  return (
    <>
      <Searchbar setPropsOptions={setOptions} queryKey="boards" isCommunity={true} baseUrl="community/posts" />
      {mounted &&
        user &&
        tags &&
        tags.tagList.length > 1 &&
        (loading1 && loading2 ? (
          <div className="flex gap-2 mt-2">
            <CardContentLSkeleton />
            <CardContentLSkeleton />
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-xl font-semibold my-5">🏷️ 자주 이용한 태그의 인기 게시물</p>

            <div className="grid grid-cols-2 gap-2">
              <CardContentL
                queryKey={["contents1"]}
                keyword={tags.tagList[0]}
                contents={contents1?.troubleShootingList}
              />
              <CardContentL
                queryKey={["contents2"]}
                keyword={tags.tagList[1]}
                contents={contents2?.troubleShootingList}
              />
            </div>
          </div>
        ))}
      <p className="text-xl font-semibold my-5">🔥실시간 인기글 Top 10</p>
      <div className="bg-white rounded-lg shadow-md mt-2 flex-col items-center">
        {hotBoard &&
          hotBoard.troubleShootingList.map((content, idx) => (
            <BoardItem
              nowUrl="community/posts"
              key={idx}
              board={content}
              idx={idx}
              last={hotBoard.troubleShootingList.length - 1}
              queryKey={["hotBoard"]}
            />
          ))}
        <Link href={"/community/posts"}>
          <div className="flex justify-center items-center text-xl font-semibold h-20 border-t-2">전체보기</div>
        </Link>
      </div>
    </>
  );
}
