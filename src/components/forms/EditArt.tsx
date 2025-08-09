import { updateArtpiece } from "@/app/artpieces/[id]/edit/artpieces";
import { getArtpieceById } from "@/lib/database";


export async function EditArt(artpieceId: any){
    const timestamp: string = new Date().toISOString();
    
    
    const artpiece = await getArtpieceById(artpieceId.artpieceId);
    if (!artpiece){
        const oops = <p>There's no art!</p>
        return oops;
    }else{
        return(
            <form action={updateArtpiece} className="bg-background-700 text-text-600 p-5 text-lg justify-items-center flex flex-col rounded-lg w-1/4" >
                <label ><p>Title</p>
                    <input type="text" id="title" name="title" className="block w-full text-text-500 pl-1 rounded-lg" defaultValue={artpiece.title} required></input>
                </label>
                <label className="mt-3">Description
                    <textarea id="description" name="description" className="block w-full text-text-500 pl-1 rounded-l" defaultValue={artpiece.description} required></textarea>
                </label>
                <label className="mt-3">Price
                    <input id="price" name="price" type="text" className="block w-full text-text-500 pl-1 rounded-l" defaultValue={artpiece.price} required></input>
                </label>
                <label className="mt-3">Image</label>
                    <input id="hero_image_url" name="hero_image_url" type="text" className="block w-full text-text-500 pl-1 rounded-l" defaultValue={artpiece.hero_image_url} required></input>
                
                <label className="mt-3">Category</label>
                <select id="category_id" name="category_id" className="block text-text-500 w-full pl-1 rounded-l" required defaultValue={artpiece.category_id}>
                    {/* <option disabled value="">-- Select an option --</option> */}
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
                <input type="hidden" value={artpiece.creator_id} name="UUID" id="UUID"></input>
                <input type="hidden" id="art_id" name="art_id" value={artpiece.id}></input>
                <input type="hidden" id="updated_at" name="updated_at" value={timestamp}></input>
                <input type="submit" value="Submit" className="self-center w-2/5 cursor-pointer rounded-lg font-semibold bg-background-500 text-text-500 p-1 mt-5 hover:bg-background-600 hover:text-text-600 "></input>
            
            </form>
        );
    }
}