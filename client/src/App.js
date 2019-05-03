import React, { useState, useEffect } from 'react';
import Username from './Username';
import Sites from './Sites';

const App = () => {
	const [sites,setSites] = useState([]);
	useEffect(() => {
		(async function() {
			const s = await getSites();
			setSites(s);
		}());
	},[getSites]);
	return (
	  <div>
	  	<Username checkUsername={(user)=>checkUsername(user)}/>
	  	<Sites sites={sites} />
	  </div>
 );
}

export default App;

async function checkUsername(user) {
	fetch(`/api/user/${user}`,{accept:'application/json'})
	.then(res=>res.json())
	.catch(err=>console.error('res',err))
	.then(data => console.log(data))
	.catch(err=>console.error('data',err))
}

async function getSites() {
	return fetch(`/api/sites`,{accept:'application/json'})
	.then(res=>res.json())
	.catch(err=>console.error('res',err))
	.then(data => data)
	.catch(err=>console.error('data',err))
}