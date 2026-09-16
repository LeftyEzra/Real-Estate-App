from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static




urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('properties.urls'))



]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('api-auth', include('rest_framework.urls'))
]

# Configure admin titles
admin.site.site_header = "SoloTech Administrative Section"
admin.site.site_title = "RealEstateApp"
admin.site.index_title = "Welcome To SoloTech Admin Area..."