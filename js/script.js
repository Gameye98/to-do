document.addEventListener("DOMContentLoaded", function() {
	clearButton();
	const baseUrl = "/db_handler.php";
	const params = {
		action: "read",
		data: "",
		new: ""
	};
	const query = new URLSearchParams(params).toString();
	const urlWithQuery = `${baseUrl}?${query}`;
	fetch(urlWithQuery).then(response => response.text()).then((data) => {
		const jsonData = JSON.parse(data);
		for(x = 0;x < jsonData.length;x++) {
			addButton(jsonData[x].data,jsonData[x].id);
		}
	});
});
document.getElementById("addBtn").addEventListener("click", function() {
	addItem();
});
document.addEventListener("click", function(event) {
	if(event.target.id === "user-input") {
		document.getElementById("user-input").focus();
	} else if(event.target.id === "updateBtn") {
		const scrollcont = document.getElementById("scroll-container");
		const scrollPosition = scrollcont.scrollTop;
		clearButton();
		var userInput = document.getElementById("user-input");
		const baseUrl = "/db_handler.php";
		const params = {
			action: "update",
			data: event.target.getAttribute("data-info"),
			new: userInput.value
		};
		userInput.value = "";
		const query = new URLSearchParams(params).toString();
		const urlWithQuery = `${baseUrl}?${query}`;
		fetch(urlWithQuery).then(response => response.text()).then((data) => {
			const jsonData = JSON.parse(data);
			for(x = 0;x < jsonData.length;x++) {
				addButton(jsonData[x].data,jsonData[x].id);
			}
		});
		setTimeout(() => {
			scrollcont.scrollTop = scrollPosition;
		}, 500);
	} else if(event.target.id === "deleteBtn") {
		const scrollcont = document.getElementById("scroll-container");
		const scrollPosition = scrollcont.scrollTop;
		clearButton();
		const baseUrl = "/db_handler.php";
		const params = {
			action: "delete",
			data: event.target.getAttribute("data-info"),
			new: ""
		};
		const query = new URLSearchParams(params).toString();
		const urlWithQuery = `${baseUrl}?${query}`;
		fetch(urlWithQuery).then(response => response.text()).then((data) => {
			const jsonData = JSON.parse(data);
			for(x = 0;x < jsonData.length;x++) {
				addButton(jsonData[x].data,jsonData[x].id);
			}
		});
		setTimeout(() => {
			scrollcont.scrollTop = scrollPosition;
		}, 500);
	}
});
function clearButton() {
	var tbls = document.getElementById("tbls");
	while(tbls.firstChild) {
		tbls.removeChild(tbls.firstChild);
	}
}
function addItem() {
	clearButton();
	var userInput = document.getElementById("user-input");
	// Add data to DB
	const baseUrl ="/db_handler.php";
	const params = {
		action: "write",
		data: userInput.value,
		new: ""
	};
	userInput.value = "";
	const query = new URLSearchParams(params).toString();
	const urlWithParams = `${baseUrl}?${query}`;
	fetch(urlWithParams).then(response => response.text()).then((data) => {
		const jsonData = JSON.parse(data);
		for(x = 0;x < jsonData.length;x++) {
			addButton(jsonData[x].data,jsonData[x].id);
		}
	});
}
function addButton(str,dataid) {
	var tr = document.getElementById("tbls");
	var td = document.createElement("td");
	// Create element <p>
	var p = document.createElement("p");
	p.innerText = str;
	td.appendChild(p);
	// Create Update Button
	var updateBtn = document.createElement("input")
	updateBtn.type = "button";
	updateBtn.className = "btn-item";
	updateBtn.id = "updateBtn";
	updateBtn.value = "Update";
	updateBtn.setAttribute("data-info",dataid);
	td.appendChild(updateBtn);
	// Create Update Button
	var deleteBtn = document.createElement("input")
	deleteBtn.type = "button";
	deleteBtn.className = "btn-item";
	deleteBtn.id = "deleteBtn";
	deleteBtn.value = "Delete";
	deleteBtn.setAttribute("data-info",dataid);
	td.appendChild(deleteBtn);
	tr.appendChild(td);
}
