const userCode = "V834YXabc123";
const apiUrl = "http://gamf.nhely.hu/ajax2/";
const httpRequest = new XMLHttpRequest();

function fetchData() {
  document.getElementById("userCode").innerHTML = "Code=" + userCode;
  httpRequest.open("POST", apiUrl, true);
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let params = "code=" + userCode + "&op=read";
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      let response = JSON.parse(httpRequest.responseText);
      let records = response.list;
      let output = "<h1>Records</h1><p>Total: " + response.rowCount + "</p><table><tr><th>ID</th><th>Name</th><th>Height</th><th>Weight</th></tr>";
      records.forEach(record => {
        output += `<tr><td>${record.id}</td><td>${record.name}</td><td>${record.height}</td><td>${record.weight}</td></tr>`;
      });
      output += "</table>";
      document.getElementById("dataDisplay").innerHTML = output;
    }
  };
  httpRequest.send(params);
}

function addRecord() {
  let name = document.getElementById("inputName").value;
  let height = document.getElementById("inputHeight").value;
  let weight = document.getElementById("inputWeight").value;
  if (name && height && weight) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=create&name=${name}&height=${height}&weight=${weight}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("addResult").innerHTML = httpRequest.responseText > 0 ? "Success!" : "Failed!";
        fetchData();
      }
    };
    httpRequest.send(params);
  }
}

function updateRecord() {
  let id = document.getElementById("editId").value;
  let name = document.getElementById("editName").value;
  let height = document.getElementById("editHeight").value;
  let weight = document.getElementById("editWeight").value;
  if (id && name && height && weight) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("editResult").innerHTML = httpRequest.responseText > 0 ? "Updated!" : "Update failed!";
        fetchData();
      }
    };
    httpRequest.send(params);
  }
}

function deleteRecord() {
  let id = document.getElementById("removeId").value;
  if (id) {
    httpRequest.open("POST", apiUrl, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = `code=${userCode}&op=delete&id=${id}`;
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        document.getElementById("removeResult").innerHTML = httpRequest.responseText > 0 ? "Deleted!" : "Delete failed!";
        fetchData();
      }
    };
    httpRequest.send(params);
  }
}

function fetchRecord() {
    let id = document.getElementById("editId").value;
    if (id) {
      httpRequest.open("POST", apiUrl, true);
      httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      let params = "code=" + userCode + "&op=read";
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          let response = JSON.parse(httpRequest.responseText);
          let records = response.list;
          let found = records.find(record => record.id == id);
          
          if (found) {
            document.getElementById("editName").value = found.name;
            document.getElementById("editHeight").value = found.height;
            document.getElementById("editWeight").value = found.weight;
          } else {
            document.getElementById("editResult").innerHTML = "Record not found!";
          }
        }
      };
      httpRequest.send(params);
    } else {
      document.getElementById("editResult").innerHTML = "Please enter an ID!";
    }
  }
  

window.onload = fetchData;
