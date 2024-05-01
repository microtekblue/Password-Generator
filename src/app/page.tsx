"use client";

import { useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { createPassword } from "@/app/actions/actions";
import Selections from "@/app/components/selections";

const initialState = {
    password: ""
};

function GenerateButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white text-xl font-bold py-4 px-8 rounded"
            type="submit" aria-disabled={pending}>
            Generate Password
        </button>
    );
}
export default function Home() {
    const [state, formAction] = useFormState(createPassword, initialState);
    const [passwordType, setPasswordType] = useState('Random')
    const handleFormChange = (type: string): any => {
        setPasswordType(type);
        state.password = '';
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 pb-24 pr-12 pl-12 bg-sky-900 font-sans">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-xl lg:flex">
        <h1 className="font-mono font-bold fixed text-white text-xl left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          Random Password Generator
        </h1>
      </div>
        <div className="mb-52 text-center w-full md:w-1/2">
            <form action={formAction} className="w-full max-w-lg mr-auto ml-auto text-white">
                <div id="generatedPassword" className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full">
                        <h1 className="block uppercase tracking-wide text-white-700 text-xl mb-2">
                            Generated {passwordType} Password
                        </h1>
                        <div
                            className="appearance-none bg-gray-200 block text-xl text-center min-h-14 break-words w-full text-green-700 border border-gray-200 rounded py-3 pt-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password" defaultValue={state?.password}> {state?.password ? state?.password : " * * * * * * * * "} </div>
                        <p className="text-white-600 text-xs italic">Make it as long and as crazy as you&apos;d like</p>
                    </div>
                </div>
                <Selections setPasswordType={handleFormChange}/>
                <GenerateButton/>
            </form>
        </div>
    </main>
  );
}