import React, { useState } from 'react';

const Username = ({ checkUsername }) => {
	const [inputValue,setInputValue] = useState(null);
	return (
	  <div>
	  	<input placeholder="enter username" onChange={(e)=>setInputValue(e.target.value)}/>
	  	<button onClick={()=>checkUsername(inputValue)}>check</button>
	  </div>
	);
}

export default Username;
