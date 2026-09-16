from django.contrib import admin
#Import the User contrib.auth.models
from .models import  State, City, Property, Inquiry, PropertyImages
from django.contrib.auth.models import User



class PropertyImagesInline(admin.TabularInline):
    model = PropertyImages
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inline = [PropertyImagesInline] 
    list_display = ('title', 'property_type', 'bedrooms','bathrooms', 'area_sqft', 'price', 'status', 'state', 'city', 'address', 
                    'description', 'image', 'owner', 'created_at')
    search_fields = ('title','property_type', 'room_type') 
    ordering = ('created_at', 'owner',)
    

admin.site.register(PropertyImages)

admin.site.register(State)
admin.site.register(City)
admin.site.register(Inquiry)
    



