const API = "http://localhost:8000/api";

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
}


async function loadSidebar() {
    const res = await fetch(`${API}/codes-grouped`);
    const data = await res.json();

    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = "";

    Object.keys(data).forEach(category => {
        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
            <button 
                class="font-bold text-lg py-2 w-full text-left flex justify-between items-center"
                onclick="toggleCategory('${category}')">
                ${category}
                <span id="arrow-${category}">▼</span>
            </button>
        `;


        const list = document.createElement("ul");
        list.classList.add("mb-4", "ml-4", "space-y-1");

        data[category].forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <button 
                    class="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    onclick="loadCode(${item.id})">
                    ${item.title}
                </button>
            `;
            list.appendChild(li);
        });

        const container = document.createElement("div");
        container.id = `cat-${category}`;
        container.appendChild(list);

        wrapper.appendChild(container);
        sidebar.appendChild(wrapper);
    });
}


function showCreateForm() {
    document.getElementById("content").innerHTML = `
        <h2 class="text-xl font-bold mb-4">Create New Code</h2>

        <div class="space-y-3">
            <input id="cat" placeholder="Category" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <input id="sub" placeholder="Subtopic" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <input id="title" placeholder="Title" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <textarea id="exp" placeholder="Explanation" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            <textarea id="tldr" placeholder="TLDR" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            <textarea id="codebox" placeholder="Code" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"></textarea>

            <button onclick="createCode()" 
                class="px-4 py-2 bg-green-600 text-white rounded">
                Save
            </button>
        </div>
    `;
}

async function createCode() {
    const body = {
        category: document.getElementById("cat").value,
        subtopic: document.getElementById("sub").value,
        title: document.getElementById("title").value,
        explanation: document.getElementById("exp").value,
        tldr: document.getElementById("tldr").value,
        code: document.getElementById("codebox").value,
    };

    const res = await fetch(`${API}/codes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (res.ok) {
        loadSidebar();
        alert("Created");
    } else {
        alert("Error");
    }
}

async function loadCode(id) {
    const res = await fetch(`${API}/codes/${id}`);
    const item = await res.json();

    document.getElementById("content").innerHTML = `
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">${item.title}</h1>

            <div class="space-x-2">
                <button onclick="showEditForm(${item.id})"
                        class="px-3 py-1 bg-yellow-500 text-white rounded">
                    Edit
                </button>

                <button onclick="deleteCode(${item.id})"
                        class="px-3 py-1 bg-red-600 text-white rounded">
                    Delete
                </button>
            </div>
        </div>

        <p class="mt-2">${item.explanation}</p>

        <div class="mt-4 p-4 rounded-lg bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto shadow">
            <pre class="language-javascript rounded-lg p-4 overflow-x-auto bg-[#1e1e1e]"  font-mono text-sm>
                <code class="language-javascript">${item.code}</code>
            </pre>
                    
        </div>

        <p class="mt-4 text-sm text-gray-600">TLDR: ${item.tldr}</p>
    `;
}


async function showEditForm(id) {
    const res = await fetch(`${API}/codes/${id}`);
    const item = await res.json();

    document.getElementById("content").innerHTML = `
        <h2 class="text-xl font-bold mb-4">Edit Code</h2>

        <div class="space-y-3">
            <input id="cat" value="${item.category}" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <input id="sub" value="${item.subtopic}" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <input id="title" value="${item.title}" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <textarea id="exp" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">${item.explanation}</textarea>
            <textarea id="tldr" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">${item.tldr}</textarea>
            <textarea id="codebox" class="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono">${item.code}</textarea>

            <button onclick="updateCode(${id})" 
                class="px-4 py-2 bg-green-700 text-white rounded">
                Update
            </button>
        </div>
    `;
}


async function updateCode(id) {
    const body = {
        category: document.getElementById("cat").value,
        subtopic: document.getElementById("sub").value,
        title: document.getElementById("title").value,
        explanation: document.getElementById("exp").value,
        tldr: document.getElementById("tldr").value,
        code: document.getElementById("codebox").value,
    };

    const res = await fetch(`${API}/codes/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (res.ok) {
        loadSidebar();
        loadCode(id);
        alert("Updated");
    } else {
        alert("Error");
    }
}


async function deleteCode(id) {
    if (!confirm("Delete this entry?")) return;

    const res = await fetch(`${API}/codes/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        loadSidebar();
        document.getElementById("content").innerHTML = "";
        alert("Deleted");
    } else {
        alert("Error deleting");
    }
}

function toggleTheme() {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}

function toggleCategory(cat) {
    const box = document.getElementById(`cat-${cat}`);
    const arrow = document.getElementById(`arrow-${cat}`);

    if (box.style.display === "none") {
        box.style.display = "block";
        arrow.textContent = "▼";
    } else {
        box.style.display = "none";
        arrow.textContent = "▶";
    }
}


loadSidebar();
