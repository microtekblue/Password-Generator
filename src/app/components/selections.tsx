import React, {Dispatch, useState} from 'react';

interface Props {
    setPasswordType: Dispatch<string>;
}
function Selections(props: Props) {
    const [selectedOption, setSelectedOption] = useState('Random');
    const [selectedLength, setLength] = useState(8);
    const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        setLength(8);
        props.setPasswordType(event.target.value);
    };

    const handleLengthChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setLength(Number(event.target.value));
    };

    return (
        <div>
            <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-white-700 text-md mb-2"
                       htmlFor="grid-state">
                    Password Options
                </label>
                <div className="relative">
                    <select
                        name="passwordType" value={selectedOption} onChange={handleSelectChange}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state">
                        <option value="Random">Random</option>
                        <option value="Memorable">Memorable</option>
                        <option value="Pin">Pin</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>
            {selectedOption === 'Random' && (
                <div className="flex flex-wrap mb-2">
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <input type="checkbox"
                               name="numbers"
                               className="appearance-none inline-block align-middle mr-3 cursor-pointer bg-white checked:bg-green-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-green focus:border-white-500"/>
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Numbers
                        </label>
                    </div>
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <input type="checkbox"
                               name="symbols"
                               className="appearance-none inline-block align-middle mr-3 cursor-pointer bg-white checked:bg-green-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-green focus:border-white-500"/>
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Symbols
                        </label>
                    </div>
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Length: {selectedLength}
                        </label>
                        <input name="length" type="range" value={selectedLength} min="8" max="100" step="1" aria-valuetext="Password length of 8"
                               id="myRange" onChange={handleLengthChange}/>
                    </div>
                </div>
            )}

            {selectedOption === 'Memorable' && (
                <div className="flex flex-wrap mb-2">
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <input type="checkbox"
                               name="capitalize"
                               className="appearance-none inline-block align-middle mr-3 cursor-pointer bg-white checked:bg-green-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-green focus:border-white-500"/>
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Capitalize
                        </label>
                    </div>
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <input type="checkbox"
                               name="fullWords"
                               className="appearance-none inline-block align-middle mr-3 cursor-pointer bg-white checked:bg-green-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-green focus:border-white-500"/>
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Full Words
                        </label>
                    </div>
                    <div className="w-1/3 px-3 mb-6 text-left">
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Length: {selectedLength}
                        </label>
                        <input name="length" type="range" value={selectedLength} min="3" max="15" step="1"
                               aria-valuetext="Password length of 3"
                               className="" id="myRange" onChange={handleLengthChange}/>
                    </div>
                </div>
            )}

            {selectedOption === 'Pin' && (
                <div className="flex flex-wrap mb-2">
                    <div className="w-full px-3 mb-6 text-left">
                        <label className="inline-block uppercase tracking-wide text-white-700 text-md mb-2"
                               htmlFor="grid-city">
                            Length: {selectedLength}
                        </label>
                        <input name="length" type="range" value={selectedLength} min="8" max="100" step="1"
                               aria-valuetext="Password length of 8"
                               className="inline-block align-middle w-[60%] ml-2" id="myRange" onChange={handleLengthChange}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Selections;
