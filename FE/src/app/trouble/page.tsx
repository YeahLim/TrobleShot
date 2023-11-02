import Searchbar from "../../components/Searchbar/Searchbar";
import TroubleContents from "./TroubleContents";

export default function Page() {
  return (
    <main className="mt-4  mx-3 flex-1 ">
      <Searchbar />
      <TroubleContents />
    </main>
  );
}
