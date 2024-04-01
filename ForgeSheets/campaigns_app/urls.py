from django.urls import path
from . import views

app_name = 'campaigns'
urlpatterns = [
  path('', views.CampaignView.as_view(), name='campaign'),
  path('create/', views.CreateCampaignView.as_view(), name='create_campaign'),
]
