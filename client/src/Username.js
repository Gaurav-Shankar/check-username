import React from 'react';

const Username = ({ search, setInputValue, checkUsername }) => {
	return (
	  <div>
	  	<input placeholder="enter username" onChange={(e)=>setInputValue(e.target.value)} value={search} />
	  	<button onClick={()=>checkUsername(search)}>check all sites</button>
	  </div>
	);
}

export default Username;
