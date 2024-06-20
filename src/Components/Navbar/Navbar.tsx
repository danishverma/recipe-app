import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchChange, searchResult } from "../../features/recipeAppSlice";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const searchInput = useSelector((state: RootState) => state.recipe.searchInput)
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_RECIPE_SEARCH_API
    const params = {
        type: process.env.REACT_APP_API_TYPE,
        q: searchInput,
        app_id: process.env.REACT_APP_API_APP_ID,
        app_key: process.env.REACT_APP_API_APP_KEY
    }
    const searchResponse = (event: React.FormEvent) => {
        event.preventDefault()
        axios.get(`${apiUrl}`, { params })
            .then(res => { console.log(res.data.hits); dispatch(searchResult(res.data.hits)) })
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(handleSearchChange(event.target.value))
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <>
            <form className="max-w-md mx-auto mt-5">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" value={searchInput} onChange={handleChange} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Recipes..." />
                    <button type="submit" onClick={searchResponse} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></button>
                </div>
            </form>
            {!token ? <button onClick={handleLogin} className="text-white absolute top-5 right-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button> : null}
        </>
    )
}
export default Navbar