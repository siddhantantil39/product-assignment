import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export interface SearchProps{
    query: string;
    setQuery : Dispatch<SetStateAction<string>>;
}

const SearchProducts = (searchProps: SearchProps) => {
    const {query, setQuery} = searchProps;

    const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    
    return(
        <>
            <form className="max-w-md mx-auto">   
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-3 h-3 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={query} onChange={(e) => onChangeQuery(e)} 
                    className="block w-full p-1 ps-8 text-sm text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-white-700 border-gray-600 placeholder-gray-400 text-black " placeholder="Search Products" required />
                </div>
            </form>
        </>
    )
};

export default SearchProducts;