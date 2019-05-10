import React from 'react';
import './Username.css';


	 const Username = ({ search, setInputValue, checkUsername }) => {
		return (
	 <div class="wrap">
   		<div class="user-search">
      		<input type="text" class="search-term" placeholder="Enter your username"  onChange={(e)=>setInputValue(e.target.value)} value={search} />
      		<button type="submit" class="search-button" onClick={()=>checkUsername(search)}>
        		<i class="fa fa-search"></i>
     		</button>
   		</div>
	</div>
		);
}

export default Username;
