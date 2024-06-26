from django.urls import path
from . import views

app_name = 'campaigns'
urlpatterns = [
  	path('', views.CampaignsView.as_view(), name='campaigns'),
  	path('criar/', views.CreateCampaignView.as_view(), name='create_campaign'),
  	path('visualizar/<slug:id>/', views.CampaignView.as_view(), name='view_campaign'),
  	path('visualizar/<slug:id>/raças/', views.RaceView.as_view(), name='races'),
  	path('visualizar/<slug:id>/classes/', views.ClassListView.as_view(), name='campaign_classes'),
  	path('visualizar/<slug:id>/classes/criar', views.ClassListView.as_view(), name='create_class'),
]