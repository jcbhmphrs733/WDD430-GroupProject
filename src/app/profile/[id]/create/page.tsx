import { AddArt } from "@/components/forms/AddArt";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function createArt({ params }: ProfilePageProps){
    const user = params.id;
    
    return (
        <div>
            <h1 className="text-center text-5xl p-5">Show off your art!</h1> 
            <div className=" block justify-items-center ">
                < AddArt userId={user}/>
            </div>
        </div>

    );
}
