// Dummy data for folders (in a real scenario, this would come from an API)
let folders = ["Folder1", "Folder2", "Folder3"];

// Populate the folder dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
    const folderSelect = document.getElementById("folderSelect");

    folders.forEach(folder => {
        const option = document.createElement("option");
        option.value = folder;
        option.textContent = folder;
        folderSelect.appendChild(option);
    });
});

// Handle folder creation
const createFolderBtn = document.getElementById("createFolderBtn");
const newFolderName = document.getElementById("newFolderName");
const submitFolderName = document.getElementById("submitFolderName");

createFolderBtn.addEventListener("click", () => {
    newFolderName.style.display = "block";
    submitFolderName.style.display = "block";
    createFolderBtn.disabled = true;
});

submitFolderName.addEventListener("click", () => {
    const folderName = newFolderName.value.trim();

    if (folderName) {
        folders.push(folderName);  // Add to the dummy folder list
        const folderSelect = document.getElementById("folderSelect");
        const option = document.createElement("option");
        option.value = folderName;
        option.textContent = folderName;
        folderSelect.appendChild(option);

        // Clear inputs and hide elements
        newFolderName.value = "";
        newFolderName.style.display = "none";
        submitFolderName.style.display = "none";
        createFolderBtn.disabled = false;
    } else {
        alert("Please enter a valid folder name.");
    }
});

// Handle file operation selection
const operationSelect = document.getElementById("operationSelect");
const fileInput = document.getElementById("fileInput");
const fileContent = document.getElementById("fileContent");
const fileOperationSection = document.getElementById("fileOperationSection");
const executeOperationBtn = document.getElementById("executeOperation");

operationSelect.addEventListener("change", () => {
    const operation = operationSelect.value;

    if (operation === "copy") {
        fileOperationSection.style.display = "block";
        fileContent.style.display = "block";
        fileInput.style.display = "none";
    } else if (operation === "upload") {
        fileOperationSection.style.display = "block";
        fileInput.style.display = "block";
        fileContent.style.display = "none";
    } else {
        fileOperationSection.style.display = "none";
    }
});

// Handle file content or upload logic
executeOperationBtn.addEventListener("click", () => {
    const operation = operationSelect.value;

    if (operation === "copy" && fileContent.value.trim() !== "") {
        // Trigger API to copy content
        alert("Copying content to webpage...");
        // Example API call
        fetch("/api/copy", {
            method: "POST",
            body: JSON.stringify({ content: fileContent.value }),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log("Response:", data);
        }).catch(error => {
            console.error("Error:", error);
        });
    } else if (operation === "upload" && fileInput.files.length > 0) {
        // Trigger API to upload file
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);

        alert("Uploading file...");
        // Example API call
        fetch("/api/upload", {
            method: "POST",
            body: formData
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log("Response:", data);
        }).catch(error => {
            console.error("Error:", error);
        });
    } else {
        alert("Please make a valid selection or provide necessary input.");
    }
});
