console.log("hello world")

const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const postsBox = document.getElementById('posts-box')
const endBox = document.getElementById('end-box')

const postForm = document.getElementById('post-form')
const title = document.getElementById('id_title')
const body = document.getElementById('id_body')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const alertBox = document.getElementById('alert-box')

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = () => {
	const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
	likeUnlikeForms.forEach(form => form.addEventListener('submit', e => {
		e.preventDefault()
		const clickedId = e.target.getAttribute('data-form-id')
		const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

		$.ajax({
			type: 'POST',
			url: '/like-unlike/',
			data: {
				'csrfmiddlewaretoken': csrftoken,
				'pk': clickedId
			},
			success: function(response) {
				console.log(response)
				clickedBtn.textContent = (response.liked ? "Unlike" : "Like") + ` (${response.like_count})`
			},
			error: function(error) {
				console.log(error)
			}
		})
	}))
}

let visible = 3

const getData = () => {
	$.ajax({
		type: 'GET',
		url: `/data/${visible}/`,
		success: function(response) {
			console.log(response)
			const data = response.data

			setTimeout(() => {
				spinnerBox.classList.add('not-visible')
				console.log(data)
				data.forEach(el => {
					postsBox.innerHTML += `
						<div class="card mb-2">
							<div class="card-body">
								<h5 class="card-title">${el.title}</h5>
								<p class="card-text">${el.body}</p>
							</div>
							<div class="card-footer">
								<div class="row">
									<div class="col-1">
										<a href="#" class="btn btn-primary">Details</a>
									</div>
									<div class="col-1">
										<form data-form-id="${el.id}" class="like-unlike-forms">
											<button href="#" id="like-unlike-${el.id}" class="btn btn-primary">${(el.liked ? "Unlike" : "Like") + ` (${el.like_count})`}</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					`
				})

				likeUnlikePosts()
			}, 100)

			console.log(response.size)

			if (response.size === 0) {
				endBox.textContent = 'No posts added yet.'
			}
			else if (response.size <= visible) {
				loadBtn.classList.add('not-visible')
				endBox.textContent = 'No more posts to load.'
			}
		},
		error: function(error) {
			console.log(error)
		}
	})
}

loadBtn.addEventListener('click', () => {
	spinnerBox.classList.remove('not-visible')
	visible += 3
	getData()
})

postForm.addEventListener('submit', e => {
	e.preventDefault()

	$.ajax({
		type: 'POST',
		url: '',
		data: {
			'csrfmiddlewaretoken': csrf[0].value,
			'title': title.value,
			'body': body.value
		},
		success: function(response) {
			console.log(response)
			postsBox.insertAdjacentHTML('afterbegin', `
				<div class="card mb-2">
					<div class="card-body">
						<h5 class="card-title">${response.title}</h5>
						<p class="card-text">${response.body}</p>
					</div>
					<div class="card-footer">
						<div class="row">
							<div class="col-1">
								<a href="#" class="btn btn-primary">Details</a>
							</div>
							<div class="col-1">
								<form data-form-id="${response.id}" class="like-unlike-forms">
									<button href="#" id="like-unlike-${response.id}" class="btn btn-primary">Like (0)</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			`)

			likeUnlikePosts()
			$('#addPostModal').modal('hide')
			handleAlerts('success', 'New post added!')
			postForm.reset()
		},
		error: function(error) {
			console.log(error)
			handleAlerts('danger', 'Oops, something went wrong!')
		}
	})
})

getData()