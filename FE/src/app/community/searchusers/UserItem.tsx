import { useUserTabStore } from "@/stores/useUserTabStore";
import { Member } from "@/types/TroubleType";
import { checkWriterImg } from "@/utils/nullWriter";

export default function UserItem({ user }: { user: Member }) {
  const { setTabUser } = useUserTabStore();
  const onAddTab = () => {
    setTabUser({ nickname: user.nickname, seq: user.seq });
  };
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <div>
          <img src={checkWriterImg(user)} alt="" className="rounded-full w-10 h-10 shadow-md" />
        </div>
        <div className="flex-col gap-2 flex">
          <p className="font-semibold">{user.nickname}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>
      <div className="ms-12">
        <button
          className="bg-main shadow-md hover:bg-amber-500 rounded-lg h-8 hover:shadow-none transition-all duration-200 px-2 mt-3"
          onClick={onAddTab}
        >
          유저 탭에 추가
        </button>
      </div>
    </div>
  );
}