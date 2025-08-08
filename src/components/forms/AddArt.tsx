'use client';

import { FormEvent } from "react";

export function AddArt(){
    const timestamp: number = Date.now();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch("/api/submit", {
            method: "POST",
            body: formData,
        })

        const data = await response.json();
    }
    

    return(
        <form action="/create" method="post" onSubmit={onSubmit} className="bg-background-700 text-text-600 p-5 text-lg justify-items-center flex flex-col rounded-lg">
            <label ><p>Title</p>
                <input type="text" id="title" className="block w-full text-text-500 pl-1 rounded-lg" required></input>
            </label>
            <label className="mt-3">Description
                <textarea id="description" className="block w-full text-text-500 pl-1 rounded-l" required></textarea>
            </label>
            <label className="mt-3">Price
                <input id="price" type="text" className="block w-full text-text-500 pl-1 rounded-l" required></input>
            </label>
            <label className="mt-3">Image</label>
                <input id="hero_image_url" type="file" className="block cursor-pointer" required></input>
            
            <label className="mt-3">Category</label>
            <select id="category_id" className="block text-text-500 w-full pl-1 rounded-l" required>
                <option disabled selected value="">-- Select an option --</option>
                <option value="9">Ceramics</option>
                <option value="10">Fiber Arts</option>
                <option value="6">Glass Art</option>
                <option value="4">Jewelry</option>
                <option value="5">Metalwork</option>
                <option value="12">Mixed Media</option>
                <option value="13">Other</option>
                <option value="7">Painting</option>
                <option value="1">Pottery</option>
                <option value="11">Printmaking</option>
                <option value="8">Sculpture</option>
                <option value="3">Textiles</option>
                <option value="2">Woodworking</option>
            </select>
            <input type="hidden" value="UUID" id="UUID"></input>
            <input type="hidden" id="created_at" value={timestamp}></input>
            <input type="hidden" id="updated_at" value={timestamp}></input>
            <input type="submit" value="Submit" className="self-center w-2/5 cursor-pointer rounded-lg font-semibold bg-background-500 text-text-500 p-1 mt-5 hover:bg-background-600 hover:text-text-600 "></input>
        
        </form>
    );
}