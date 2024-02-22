"use client";
import { useNotesStore } from "@/store/notesStore";
import Link from "next/link";

/**
 * Renders a list of notes.
 * @returns JSX element representing the notes list.
 */
export default function NotesList() {
  const list = useNotesStore((state) => state.list);

  return (
    <>
      <div className="p-10 w-full ">
        <p className="text-xl text-slate-200 mb-6">Bienvenue sur Notes101</p>
        <div>
          {list.length > 0 && (
            <ul className="grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {list.map((note) => (
                <Link href={`/notes/${note.id}`} key={note.id}>
                  <li
                    key={note.id}
                    className="bg-slate-200 hover:bg-slate-50 p-4 rounded cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-gray-700 ">{note.subtitle}</p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
// Path: src/pages/index.tsx