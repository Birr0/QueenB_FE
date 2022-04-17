import { useNavigate } from "react-router-dom";

export const Template = ({component}) => {
    const navigate = useNavigate();
    return(
        <div class="min-h-screen bg-gray-100">
            <div class="flex justify-between bg-gray-800 w-full h-14 p-2">

                <button 
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}
                class="text-center text-yellow-300 text-3xl">QueenB</button>
                <div class="flex space-x-2">
                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/advanced-search');
                    }}
                    class="text-yellow-300 border-solid border-2 rounded-md p-1 border-yellow-400 hover:bg-yellow-300 hover:border-yellow-500 hover:text-black hover:text-semibold hover:text-lg">Advanced</button>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/features');
                        }}
                    class="text-yellow-300 border-solid border-2 rounded-md p-1 border-yellow-400 hover:bg-yellow-300 hover:border-yellow-500 hover:text-black hover:text-semibold hover:text-lg">Guide</button>
                </div>
            </div>
            {component}
        </div>
    )
}