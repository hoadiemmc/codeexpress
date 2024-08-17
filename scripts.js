const SHEET_ID = "1UVbxvIhxXbwX-abtMGeZikYGy7lp9PKJU7T101yQ1Tc";
const RANGE = "A1:D50"; // Change the column and row range if needed
let autoFetch = false;

document.getElementById("fetch-data-button").addEventListener("click", () => {
  autoFetch = !autoFetch;
  fetchData();
});

function fetchData() {
  const sheetName = document.getElementById("sheet-name").value.trim();
  if (!sheetName) {
    alert("Please enter a sheet name.");
    return;
  }

  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${sheetName}&range=${RANGE}`;

  fetch(SHEET_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      try {
        const jsonData = JSON.parse(data.substring(47).slice(0, -2)); // Remove unnecessary prefix and suffix
        const rows = jsonData.table.rows;
        const headers = jsonData.table.cols.map((col) => col.label);
        const tbody = document.querySelector("#sheet-data tbody");
        const thead = document.querySelector("#sheet-data thead");
        const table = document.querySelector("#sheet-data");

        tbody.innerHTML = "";
        thead.innerHTML = "";

        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        rows.forEach((row) => {
          const tr = document.createElement("tr");
          row.c.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell ? cell.v : "";
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });

        // Hiệu ứng chuyển cảnh kéo dần lên trên
        const mainContainer = document.querySelector(".main-container");
        mainContainer.style.transform = "translateY(0)"; // Đảm bảo khung dữ liệu không bị dịch chuyển

        table.style.opacity = 1; // Hiện bảng dữ liệu

        if (autoFetch) {
          setTimeout(fetchData, 2000); // Automatically fetch data again after 2 seconds
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
