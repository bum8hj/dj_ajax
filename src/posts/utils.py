from .models import Post
from profiles.models import Profile
from django.shortcuts import redirect

def action_permission(func):
	def wrapper(request, **kwargs):
		pk = kwargs.get('pk')
		profile = Profile.objects.get(user=request.user)
		post = Post.objects.get(pk=pk)

		if profile.user == post.author.user:
			#print('You are the author')
			return func(request, **kwargs)
		else:
			#print('You are not the author')
			return redirect('posts:main-board')

	return wrapper