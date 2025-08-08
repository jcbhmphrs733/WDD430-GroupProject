import { addArtpiece } from "@/app/profile/[id]/create/actions";

export function AddArt(userId: any){
    const timestamp: string = new Date().toISOString();
    const creator_id: string = userId.userId;
       

    return(
       <form action={addArtpiece} className="bg-background-700 text-text-600 p-5 text-lg justify-items-center flex flex-col rounded-lg w-1/4" >
            <label ><p>Title</p>
                <input type="text" id="title" name="title" className="block w-full text-text-500 pl-1 rounded-lg" required></input>
            </label>
            <label className="mt-3">Description
                <textarea id="description" name="description" className="block w-full text-text-500 pl-1 rounded-l" required></textarea>
            </label>
            <label className="mt-3">Price
                <input id="price" name="price"type="text" className="block w-full text-text-500 pl-1 rounded-l" required></input>
            </label>
            <label className="mt-3">Image</label>
                <input id="hero_image_url" name="hero_image_url" type="text" className="block w-full text-text-500 pl-1 rounded-l" required></input>
            
            <label className="mt-3">Category</label>
            <select id="category_id" name="category_id" className="block text-text-500 w-full pl-1 rounded-l" required defaultValue="-- Select an option --">
                <option disabled value="">-- Select an option --</option>
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
            <input type="hidden" id="creator_id" name="creator_id" value={creator_id}></input>
            <input type="hidden" id="created_at" name="created_at" value={timestamp}></input>
            <input type="hidden" id="updated_at" name="updated_at" value={timestamp}></input>
            <input type="submit" value="Submit" className="self-center w-2/5 cursor-pointer rounded-lg font-semibold bg-background-500 text-text-500 p-1 mt-5 hover:bg-background-600 hover:text-text-600 "></input>
        
        </form>
    );
}