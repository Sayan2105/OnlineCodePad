  async function saveNote() {
    const note = document.getElementById('note').value;
    await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: note })
    });
    document.getElementById('note').value = '';
    alert('Note saved');
  }

  async function getNotes() {
    const res = await fetch('http://localhost:3000/notes');
    const data = await res.json();
    document.getElementById('result').innerHTML =
      data.map(n => `<p class='border-b py-2'>${n.content}</p>`).join('');
  }

  function toggleTheme() {
    const body = document.getElementById('body');
    const btn = document.getElementById('themeBtn');
    if (body.classList.contains('bg-gray-100')) {
      body.classList.replace('bg-gray-100', 'bg-gray-900');
      body.classList.replace('text-gray-900', 'text-gray-100');
      btn.textContent = 'Light Mode';
    } else {
      body.classList.replace('bg-gray-900', 'bg-gray-100');
      body.classList.replace('text-gray-100', 'text-gray-900');
      btn.textContent = 'Dark Mode';
    }
  }