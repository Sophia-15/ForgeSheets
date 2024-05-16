from django.shortcuts import redirect, render
from django.views import View
from campaigns_app.models import Campaign
from .utils import save_campaign
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from sheets_app.models import Sheet

class CampaignsView(LoginRequiredMixin, View): 
  def get(self, request):
      campaigns = Campaign.objects.filter(user_id=request.user.id)
      ctx = {
         'campaigns': campaigns,
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/campaigns.html', ctx)


class CreateCampaignView(LoginRequiredMixin, View):
   def get(self, request):
      ctx = {
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/create_camp.html', ctx)

   def post(self, request):
      image = request.POST.get('image')
      title = request.POST.get('title')
      description = request.POST.get('description')
      user_id = request.user.id

      fields = save_campaign(image, title, description, user_id)

      ctx = {
      'image': image,
      'title': title,
      'description': description,
   }

      if fields:
         ctx['errors'] = fields
         ctx['app_name'] = 'campaign'
         for field_error in fields:
               ctx.pop(field_error['field'], None)
         return render(request, 'campaigns_app/create_camp.html', ctx)

      return redirect('campaigns:campaigns')

class CampaignView(LoginRequiredMixin, View):
   def get(self, request, id):
      campaign = Campaign.objects.filter(id=id).first()
      #sheets = Sheet.objects.all()

      ctx = {
         'campaign': campaign,
         #'sheets': sheets,
      }

      return render(request, 'campaigns_app/campaign.html', ctx)

#class UpdateCampaignView(LoginRequiredMixin, View):
#class DeleteCampaignView(LoginRequiredMixin, View):