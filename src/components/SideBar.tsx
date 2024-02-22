import edit from "../assets/edit.svg";
import folder from "../assets/folder.svg";
import  Link  from "next/link";
import Image from "next/image";
import Bullets from "./Bullets";

export default function SideBar() {

  return (
    <aside className="shrink-0 bg-slate-800 w-[100px] flex flex-col items-center pt-10">
      <Bullets />
      <Link href={`/`} className="mb-12">
        <Image src={folder} alt="see  notes" width={30} height={30} />
      </Link>
      <Link href={`/notes/new`}>
        <Image src={edit} alt="edit" width={30} height={30} />
      </Link>
    </aside>
  );
}                                                                                                                                                                                        
