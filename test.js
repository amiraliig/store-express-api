fetch("http://localhost:5000/auth/login/", {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		email: "test@gmail.com",
		password: "12345678"
	})
})
	.then(res => {
		console.log(res);

		// بهتر است وضعیت پاسخ را هم چک کنی
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		return res.json();
	})
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.log("err")
		console.log(err);
	});