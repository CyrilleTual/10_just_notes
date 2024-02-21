import edit from "../assets/edit.svg";
import folder from "../assets/folder.svg";
import  Link  from "next/link";
import Image from "next/image";

export default function SideBar() {
  return (
    <aside className="shrink-0 bg-slate-800 w-[100px] flex flex-col items-center pt-10">
      <div className="flex mb-12">
        <div className="w-4 h-4 mr-2 rounded-full bg-red-500"></div>
        <div className="w-4 h-4 mr-2 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      </div>
      <Link href={`/`} className="mb-12">
        <Image src={folder} alt="see  notes" width={30} height={30} />
      </Link>
      <Link href={`/notes/new`}>
        <Image src={edit} alt="edit" width={30} height={30} />
      </Link>
    </aside>
  );
}                                                                                                                                                                                        
