// import React,{useState} from "react";
// import Draggable from 'react-draggable';

// const Text= ()=>{
//     const [editMode,setEditmode]=useState(false);
//     const [val,setVal] = useState('double click to edit');

//     return (
//         <div className="position-absolute" style={{top:'200px',left:'300px'}}>
//         <Draggable>
//            {
//              editMode ? 
//              <input className="mt-5" value={val} onChange={(e)=> setVal(e.target.value)} onDoubleClick={(e)=>setEditmode(false)}/> 
//              : <h3 className="mt-5" onDoubleClick={(e)=>setEditmode(true)}>{val}</h3>   
//            }
//         </Draggable>
//         </div>
//     );
// }

// export default Text;

import React from "react";
import Draggable from 'react-draggable';

const Text= (props)=>{

    return (
        <div className="position-absolute" style={{top:'200px',left:'300px'}}>
        <Draggable>
            <h3 className="mt-5">aman</h3>   
        </Draggable>
        </div>
    );
}

export default Text;