console.log("hello world detail")
console.log(window.location.href)

const postBox = document.getElementById('post-box')
const alertBox = document.getElementById('alert-box')
const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const spinnerBox = document.getElementById('spinner-box')

const url = window.location.href + "data/"
const updateUrl = window.location.href + "update/"
const deleteUrl = window.location.href + "delete/"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

/* backBtn.addEventListener('click', () => {
	history.back()
}) */

$.ajax({
	type: 'GET',
	url: url,
	success: function(response) {
		console.log(response)
		const data = response.data

		if (data.logged_in !== data.author) {
			console.log('different')
		} else {
			console.log('the same')
			updateBtn.classList.remove('not-visible')
			deleteBtn.classList.remove('not-visible')
		}

		const authorEl = document.createElement('a')
		authorEl.setAttribute('class', 'author')
		authorEl.setAttribute('id', 'author')
		authorEl.setAttribute('href', `/profiles/${data.author}/`)

		const titleEl = document.createElement('h3')
		titleEl.setAttribute('id', 'title')
		titleEl.setAttribute('style', 'font-weight: 800')

		const bodyEl = document.createElement('p')
		bodyEl.setAttribute('id', 'body')

		authorEl.textContent = `${data.author}`
		titleEl.textContent = data.title
		bodyEl.textContent = data.body

		postBox.appendChild(authorEl)
		postBox.appendChild(titleEl)
		postBox.appendChild(bodyEl)

		titleInput.value = data.title
		bodyInput.value = data.body

		spinnerBox.classList.add('not-visible')
	},
	error: function(error) {
		console.log(error)
	}
})

updateForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const title = document.getElementById('title')
	const body = document.getElementById('body')

	$.ajax({
		type: 'POST',
		url: updateUrl,
		data: {
			'csrfmiddlewaretoken': csrf[0].value,
			'title': titleInput.value,
			'body': bodyInput.value
		},
		success: function(response) {
			console.log(response)
			handleAlerts('success', 'Post updated.')

			title.textContent = response.title
			body.textContent = response.body
		},
		error: function(error) {
			console.log(error)
		}
	})
})

deleteForm.addEventListener('submit', (e) => {
	e.preventDefault()

	$.ajax({
		type: 'POST',
		url: deleteUrl,
		data: {
			'csrfmiddlewaretoken': csrf[0].value
		},
		success: function(response) {
			window.location.href = window.location.origin
			localStorage.setItem('title', titleInput.value)
		},
		error: function(error) {
			console.log(error)
		}
	})
})