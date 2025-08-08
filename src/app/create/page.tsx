import { AddArt } from "@/components/forms/AddArt";

export default function createArt(){

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div>
            <h1 className="text-center text-5xl p-5">Show off your art!</h1> 
            <div className=" block justify-items-center ">
                < AddArt />
            </div>
        </div>

    );
}
