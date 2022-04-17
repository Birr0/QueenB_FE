import { Template } from "./Template";
import { LECTURERS, COURSE_LIST, TYPE } from "./modelData";

export const AdminPage = () => {
    return(
        <Template component={
            <div>
                <br></br>
                <div class="bg-white w-4/5 m-auto rounded-md p-4 ">
                <p class="text-2xl font-semibold mb-2">Resources</p>
                
                    <p class="text-xl">Add resource</p>
                    <hr></hr>
                    <form>
                        <p>Module</p>
                        <select class="h-8 bg-white border-2 border-gray-200">
                            {COURSE_LIST.map((course) => {
                                return(
                                    <option>{course}</option>
                                )
                            })}
                        </select>
                        <p>Lecturer</p>
                        <select class="h-8 bg-white border-2 border-gray-200">
                            {LECTURERS.map((lecturer) => {
                                return(
                                    <option>{lecturer}</option>
                                )
                            })}
                        </select>
                        <p>Resource type</p>
                        <select class="h-8 bg-white border-2 border-gray-200">
                            {TYPE.map((type) => {
                                return(
                                    <option>{type}</option>
                                )
                            })}
                        </select>
                        <div class="border-2 border-gray-300 w-1/2 space-y-2 p-1 mt-2 rounded-md">
                            <p>Attach pdf</p>
                            <hr></hr>
                            <input type="file" accept="application/pdf" class="mt-2"/>
                        </div>
                        <button class="bg-yellow-300 p-2 rounded-md m-2 font-semibold hover:font-bold hover:border-yellow-500">Add</button>
                    </form>
                    
                    <hr></hr>
                    <p>Show resources - add RUD options</p>
                </div>
                <br></br>
                <div class="bg-white w-4/5 m-auto rounded-md p-4">
                <p class="text-2xl font-semibold">Lecturers</p>
                    <form class="block">
                        <p>First name</p>
                        <select class="h-8">
                            <option>Dr.</option>
                            <option>Prof.</option>
                        </select>
                        <input type="text" class="h-8 border-2 border-gray-200 rounded-sm"/>
                        <p>Last name</p>
                        <input type="text" class="border-2 border-gray-200 rounded-sm"/>
                        <button class="bg-yellow-300 p-2 rounded-md m-2 font-semibold hover:font-bold hover:border-yellow-500">Add</button>
                    </form>
                    <hr></hr>
                    <p>add RUD options</p>
                </div>
               <br></br>
                <div class="bg-white w-4/5 m-auto rounded-md p-4 ">
                <p class="ml-auto text-2xl font-semibold">Modules</p>
                    <form>
                        <p>Module code</p>
                        <select class="h-8">
                            <option>PHY</option>
                        </select>
                        <input type="text" class="h-8 border-2 border-gray-200 rounded-sm"/>
                        <p>Module title</p>
                        <input type="text" class="h-8 border-2 border-gray-200 rounded-sm"/>
                        <button class="bg-yellow-300 p-2 rounded-md m-2 font-semibold hover:font-bold hover:border-yellow-500">Add</button>
                    </form>
                    <hr></hr>
                    <p>add RUD options</p>
                </div>
            </div>
        } />
    )
}