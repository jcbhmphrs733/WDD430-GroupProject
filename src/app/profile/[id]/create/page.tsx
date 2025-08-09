import { AddArt } from "@/components/forms/AddArt";
import { getCurrentUser } from "@/lib/session";
import { getUserById } from "@/lib/database";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";


interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function createArt({ params }: ProfilePageProps){
        // Await params first
        let loggedIn = false
        const { id } = await params;
    
        const currentUser = await getCurrentUser();
    
        if (currentUser && String(currentUser.id) === id) {
          loggedIn = true
        }
        
        const [user] = await Promise.all([
          getUserById(id),
        ]);
    
        if (!user) {
          notFound();
        }
  if (!loggedIn){
    redirect("/login");
  }else{
    return (
        <div>
            <h1 className="text-center text-5xl p-5">Show off your art!</h1> 
            <div className=" block justify-items-center ">
                < AddArt userId={id}/>
            </div>
        </div>

    );
  } 
}
