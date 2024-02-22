"use client";
import { useNotesStore } from "@/store/notesStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page({ params }: { params: { id: string } }) {
  // Get the note from the store following the id
  const note = useNotesStore((state) =>
    state.list.find((note) => note.id === params.id)
  );

  const router = useRouter();

    // if the note is not found, go to the landing page
  useEffect(() => {
    if (!note) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const removeNote = useNotesStore((state) => state.removeNote);

  //// delete one note by id
  const handleDelete = () => {
    removeNote(params.id);
  };

  return (
    <>
      <div className=" flex flex-col ">
        <div className=" flex m-6 mt-10 pl-3 ">
          {/* goback to landing page */}
          <Link href="/">
            <Button className="  bg-slate-200 text-slate-800 mr-5 h-8">
              Notes
            </Button>
          </Link>

          {/* update  note */}
          <Link href={`/notes/${params.id}/edit`}>
            <Button className=" bg-green-500 mr-5 h-8">Editer</Button>
          </Link>

          {/* delete note */}
          <Button
            className=" h-8 "
            variant={"destructive"}
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </div>

        {note && (
          <div className=" text-slate-200 p-10 w-full ">
            <h1 className="text-slate-200 text-3xl font-semibold mb-4">
              {note.title}
            </h1>
            <p className="text-slate-200 mb-6">{note.subtitle}</p>
            <div
              className=" ql-snow ql-editor"
              dangerouslySetInnerHTML={{
                __html: note.bodyText as string,
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
