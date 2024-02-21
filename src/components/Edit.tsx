"use client";
import { useNotesStore } from "@/store/notesStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Note } from "@/store/notesStore"; /// type definition for Note
import { Button } from "./ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditProps {
  id?: string;
}

function Edit({ id }: EditProps) {
  const list = useNotesStore((state) => state.list);
  const router = useRouter();

  const initialState = {
    title: "" as string,
    subtitle: "" as string,
    bodyText: "" as string,
    id: "" as string,
  } as Note;

  const [inputsValues, setInputsValues] = useState<Note>(initialState);

  const [showValidation, setShowValidation] = useState<{
    title: boolean;
    subtitle: boolean;
    bodyText: boolean;
  }>({
    title: false,
    subtitle: false,
    bodyText: false,
  });

  useEffect(() => {
    const note = list.find((note) => note.id === id);
    if (note) {
      setInputsValues(note);
    }
  }, [id, list]);

  /// handle the form fields changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputsValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlequillChange = (value: string) => {

    console.log(value);
    setInputsValues((prevState) => ({
      ...prevState,
      bodyText: value,
    }));
  };

  // handle the form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isFormValid = true;

    // we check if the form is valid method 1
    Object.keys(showValidation).forEach((key) => {
        if (!inputsValues[key]) {
          isFormValid = false;
          setShowValidation((prevState) => ({ ...prevState, [key]: true }));
        } else {
          setShowValidation((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
    });

    // // we check if the form is valid
    // if (!inputsValues.title) {
    //   isFormValid = false;
    //   setShowValidation((prevState) => ({ ...prevState, title: true }));
    // } else {
    //   setShowValidation((prevState) => ({ ...prevState, title: false }));
    // }

    // if (!inputsValues.subtitle) {
    //   isFormValid = false;
    //   setShowValidation((prevState) => ({ ...prevState, subtitle: true }));
    // } else {
    //   setShowValidation((prevState) => ({ ...prevState, subtitle: false }));
    // }

    // if (!inputsValues.bodyText) {
    //   isFormValid = false;
    //   setShowValidation((prevState) => ({ ...prevState, bodyText: true }));
    // } else {
    //   setShowValidation((prevState) => ({ ...prevState, bodyText: false }));
    // }

    // if the form is valid, we add or update the note
    if (isFormValid) {
      if (id) {
        useNotesStore.getState().updateNote({
          ...inputsValues,
          id: id,
        });
        router.push(`/notes/${id}`);
      } else {
        useNotesStore.getState().addNote({
          ...inputsValues,
          id: Math.random().toString(),
        });
        setInputsValues(initialState);
      }
    }
  };

  return (
    <>
      {/* form to set a new note or to modify an existing note */}

      <div className="w-full p-10">
        <h1 className="text-slate-100 text-xl mb-4">
          {id ? "Modifier une note" : "Ajouter une note"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="mb-2 block text-slate-100">
            Le titre
          </label>
          <input
            className="p-2 text-md block w-full rounded bg-slate-200"
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleInputChange(e)}
            value={inputsValues.title}
          />
          {showValidation.title && (
            <span className="text-red-600">Le titre est obligatoire</span>
          )}
          {/********************* form subTitle **********************************/}
          <label htmlFor="subtitle" className="mb-2 block mt-4 text-slate-100">
            Le sous-titre
          </label>
          <input
            className="p-2 text-md block w-full rounded bg-slate-200"
            type="text"
            name="subtitle"
            id="subtitle"
            onChange={(e) => handleInputChange(e)}
            value={inputsValues.subtitle}
          />
          {showValidation.subtitle && (
            <span className="text-red-600">Le sous-titre est obligatoire</span>
          )}
          {/********************* form bodyText  **********************************/}
          <label htmlFor="bodyText" className="mb-2 mt-4 block text-slate-100">
            Le contenu de la note
          </label>
          {/* <textarea
            className="p-2 text-md block w-full rounded bg-slate-200 min-h-[300px]  "
            name="bodyText"
            id="bodyText"
            onChange={(e) => handleInputChange(e)}
            value={inputsValues.bodyText}
          /> */}
          <ReactQuill
            className="p-2 text-md block w-full rounded bg-slate-200 min-h-[300px]"
            value={inputsValues.bodyText}
            onChange={handlequillChange}
          />
          ;
          {showValidation.bodyText && (
            <span className="text-red-600">Le text est obligatoire</span>
          )}
          {/**************** subbmit*****************************/}
          <Button className="mt-6 px-7 text-center bg-green-700 hover:bg-green-800 hover:scale-110 font-bold">
            Enregister
          </Button>
        </form>
      </div>
    </>
  );
}

export default Edit;
