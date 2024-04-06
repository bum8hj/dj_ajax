console.log("hello world detail")

const backBtn = document.getElementById('back-btn')
const spinnerBox = document.getElementById('spinner-box')
const url = window.location.href + "data/"

backBtn.addEventListener('click', () => {
	history.back()
})

$.ajax({
	type: 'GET',
	url: url,
	success: function(response) {
		console.log(response)
		spinnerBox.classList.add('not-visible')
	},
	error: function(error) {
		console.log(error)
	}
})