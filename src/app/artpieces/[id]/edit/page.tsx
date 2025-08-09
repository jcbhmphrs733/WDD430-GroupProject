import { EditArt } from "@/components/forms/EditArt";
import { getCurrentUser } from "@/lib/session";
import { getUserById, getArtpieceById } from "@/lib/database";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";


interface ArtpiecePageProps {
  params: {
    id: string;
  };
}

export default async function editArt({ params }: ArtpiecePageProps){
    // Await params first
    
    const { id } = await params;
    const artpiece = await getArtpieceById(id);
    if (!artpiece) {
          notFound();
        }
    
    let loggedIn = false
    const currentUser = await getCurrentUser();

    if (currentUser && String(currentUser.id) === String(artpiece.creator_id)) {
      loggedIn = true;
    }
  if (!loggedIn){
    redirect("/login");
  }else{
    return (
        <div>
            <h1 className="text-center text-5xl p-5">Show off your art!</h1> 
            <div className=" block justify-items-center ">
                    < EditArt artpieceId={id} />
            </div>
        </div>

    );
  }
}
