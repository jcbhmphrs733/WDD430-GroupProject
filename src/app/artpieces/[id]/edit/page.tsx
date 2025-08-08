import { EditArt } from "@/components/forms/EditArt";


interface ArtpiecePageProps {
  params: {
    id: string;
  };
}

export default async function editArt({ params }: ArtpiecePageProps){
    const timestamp: number = Date.now();
    const string = await params.id;

    return (
        <div>
            <h1 className="text-center text-5xl p-5">Show off your art!</h1> 
            <div className=" block justify-items-center ">
                    < EditArt artpieceId={string} />
            </div>
        </div>

    );
}
