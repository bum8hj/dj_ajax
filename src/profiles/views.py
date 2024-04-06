from django.shortcuts import render
from .models import Profile
from .forms import ProfileForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect

# Create your views here.

@login_required
def my_profile_view(request):
	obj = Profile.objects.get(user=request.user)
	form = ProfileForm(request.POST or None, request.FILES or None, instance=obj)

	if request.headers.get('x-requested-with') == 'XMLHttpRequest':  # equivalent to request.is_ajax()
		if form.is_valid():
			instance = form.save()
			return JsonResponse({
				'bio': instance.bio,
				'avatar': instance.avatar.url,
				'user': instance.user.username
			})

	context = {
		'obj': obj,
		'form': form
	}

	return render(request, 'profiles/main.html', context)

@login_required
def profile_detail_view(request, username):
	try:
		user = User.objects.get(username=username)
		profile = Profile.objects.get(user=user)
	except (User.DoesNotExist, Profile.DoesNotExist):
		return redirect('posts:main-board')

	if request.user == profile.user:
		form = ProfileForm(request.POST or None, request.FILES or None, instance=profile)

		if request.headers.get('x-requested-with') == 'XMLHttpRequest':  # equivalent to request.is_ajax()
			if form.is_valid():
				instance = form.save()
				return JsonResponse({
					'bio': instance.bio,
					'avatar': instance.avatar.url,
					'user': instance.user.username
				})

		context = {
			'obj': profile,
			'form': form
		}

	else:
		context = {
			'obj': profile
		}

	return render(request, 'profiles/main.html', context)