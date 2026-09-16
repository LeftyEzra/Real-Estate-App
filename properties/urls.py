from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


from .views import PropertyCreateView, PropertyListView, PropertyDetailView
from .views import StateCreateView, StateListView
from .views import CityCreateView, CityListView
from .views import InquiryCreateView, InquiryDetailView, InquiryListView 
from .views import PropertyImagesCreateView, PropertyImagesListView, PropertyImagesDetailView

#from .views import stateListAPI

urlpatterns = [
    path('', views.getData, name='api-data'),
    path('property-create/',PropertyCreateView.as_view(), name='property-create'),
    path('properties/', PropertyListView.as_view(), name='property-list'),
    path('<slug:slug>/details/', PropertyDetailView.as_view(), name='property-details'),
    

    path('state-create/', StateCreateView.as_view(), name='state-create'),
    path('states/', StateListView.as_view(), name='state-list'),

    path('city-create/', CityCreateView.as_view(), name='city-create'),
    path('cities/', CityListView.as_view(), name='city-list'),

    path('inquiry-create/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('inquiries/', InquiryListView.as_view(), name='inquiry-list'),
    path('<slug:slug>/inquiry details/', InquiryDetailView.as_view(), name='inquiry-details'),

    path('propertyimages-create/', PropertyImagesCreateView.as_view(), name='property-images-create'),
    path('property mages/', PropertyImagesListView.as_view(), name='property-images-list'),
    path('<slug:slug>/images details/', PropertyImagesDetailView.as_view(), name='property-images-details'),


]




# format_suffix_patterns allows API endpoints to accept optional format suffixes 
# (like .json, .xml, .api) in the URL. For example, /properties/ and /properties.json 
# will both work. This makes the API more flexible for clients that want to specify 
# the response format directly in the URL instead of only through headers.
urlpatterns = format_suffix_patterns(urlpatterns)
