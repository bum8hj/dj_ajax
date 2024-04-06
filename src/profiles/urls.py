from django.urls import path
from .views import my_profile_view, profile_detail_view
app_name = 'profiles'

urlpatterns = [
	path('my/', my_profile_view, name='my-profile'),
	path('<str:username>/', profile_detail_view, name='profile-detail'),
]