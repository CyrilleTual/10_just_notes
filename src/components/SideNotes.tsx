"use client";
import { useNotesStore } from "@/store/notesStore";
import { useEffect } from "react";
import Link from "next/link";

export default function SideNotes() {
  
  const list = useNotesStore((state) => state.list);
   useEffect(() => {
     if (list.length === 0) {
       useNotesStore.getState().addNotesFormApi();
     }
   }, [list]);

  return (
    <>
      <aside className="shrink-0 bg-slate-100 w-[275px] flex flex-col items-center  pt-10 border-r border-gray-300">
        <h1 className="text-center text-2xl border-b-[1px] border-gray-700 pb-6 w-full ">
          Mes notes
        </h1>
        <div className="w-full ">
          <div>
            {list.length > 0 && (
              <ul className="divide-y divide-slate-300">
                {list.map((note) => (
                  <li
                    key={note.id}
                    className=" hover:bg-slate-50 p-4 rounded cursor-pointer"
                  >
                    <Link href={`/notes/${note.id}`}>
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-gray-700">{note.subtitle}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
