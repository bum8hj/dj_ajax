from django.urls import path
from .views import (
	post_list_and_create,
	like_unlike_post,
	post_detail,

	load_posts_data_view,
)

app_name = 'posts'

urlpatterns = [
	path('', post_list_and_create, name='main-board'),
	path('like-unlike/', like_unlike_post, name='like-unlike'),
	path('<pk>/', post_detail, name='post-detail'),

	path('data/<int:num_posts>/', load_posts_data_view, name='posts-data'),
]
