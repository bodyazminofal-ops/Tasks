const fs = require("fs");
function loadEntries() {
  if (!fs.existsSync("entries.json")) {
    return [];
  }
  const data = fs.readFileSync("entries.json", "utf8");
  if (data === "") {
    return [];
  }
  return JSON.parse(data);
}

function saveEntries(entries) {
  fs.writeFileSync("entries.json", JSON.stringify(entries, null, 2));
}
function getNextId(entries) {
  if (entries.length === 0) {
    return 1;
  }
  return Math.max(...entries.map((entry) => entry.id)) + 1;
}

function addEntry(title) {
  const entries = loadEntries();

  const newEntry = {
    id: getNextId(entries),
    title: title,
  };
  entries.push(newEntry);
  saveEntries(entries);
  console.log(`entry added successfully with id ${newEntry.id}`);
}

function listEntries() {
  const entries = loadEntries();

  if (entries.length === 0) {
    console.log("No entries found.");
    return;
  }

  entries.forEach((entry) => {
    console.log(`${entry.id} - ${entry.title}`);
  });
}

function editEntry(id, newTitle) {
  const entries = loadEntries();

  const entry = entries.find((entry) => entry.id === id);

  if (!entry) {
    console.log("Entry not found.");
    return;
  }

  entry.title = newTitle;

  saveEntries(entries);

  console.log("Entry edited successfully.");
}

function deleteEntry(id) {
  const entries = loadEntries();

  const entryIndex = entries.findIndex((entry) => entry.id === id);

  if (entryIndex === -1) {
    console.log("Entry not found.");
    return;
  }

  entries.splice(entryIndex, 1);

  saveEntries(entries);

  console.log("Entry deleted successfully.");
}

const command = process.argv[2];
if (command === "add") {
  const title = process.argv[3];

  if (!title) {
    console.log("Please provide an entry.");
  } else {
    addEntry(title);
  }
} else if (command === "list") {
  listEntries();
} else if (command === "edit") {
  const id = Number(process.argv[3]);
  const newTitle = process.argv[4];

  if (!id || !newTitle) {
    console.log("Please provide an id and a new title.");
  } else {
    editEntry(id, newTitle);
  }
} else if (command === "delete") {
  const id = Number(process.argv[3]);

  deleteEntry(id);
}
