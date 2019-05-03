import React, { useState, useEffect } from 'react';
import Username from './Username';
import Sites from './Sites';

const App = () => {
	const [sites,setSites] = useState([null,[]]);
	useEffect(() => {
		getSites();
	},[setSites]);
	console.log(sites);
	return (
	  <div>
	  	<Username checkUsername={(user)=>checkUsername(user)} />
	  	{sites[0] ? sites[0] : ''}
	  	<Sites sites={sites[1]} />
	  	<button onClick={getSites}>get all sites</button>
	  </div>
 );
	async function checkUsername(user) {
		fetch(`/api/user/${user}`,{accept:'application/json'})
		.then(res=>res.json())
		.then(data => setSites(data))
		.catch(err=>console.error('user',err))
	}

	async function getSites() {
		fetch(`/api/sites`,{accept:'application/json'})
		.then(res=>res.json())
		.then(data => setSites(data))
		.catch(err=>console.error('sites',err))
	}
}

export default App;
