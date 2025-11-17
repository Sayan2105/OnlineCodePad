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
