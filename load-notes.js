function createNotePreviewFromTemplate ({ note, template, urlPrefix }) {
  const notePreview = template.content.cloneNode(true)

  notePreview.querySelector('.note-preview-link').innerText = note.title
  notePreview.querySelector('.note-preview-link').href = urlPrefix + note.slug
  notePreview.querySelector('.note-preview-introduction').innerText = note.introduction

  return notePreview
}

export async function loadNotes ({ container, template, dataUrl, urlPrefix }) {
  container.innerText = 'Loading notes…'

  const data = await fetch(dataUrl)
    .then(response => {
      container.innerText = ''
      return response.json()
    })
    .catch(error => console.error(error))

  data.forEach(note => {
    const notePreview = createNotePreviewFromTemplate({ note, template, urlPrefix })

    container.appendChild(notePreview)
  })
}
