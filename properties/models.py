from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class AutoSlugModel(models.Model):
    slug = models.SlugField(max_length=250, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            # Looks for 'name' or 'title' automatically from whichever model uses it
            title_field = getattr(
                self, 'title', 
                getattr(self, 'name', 
                getattr(self, 'client', None))
            )
            #title_field = getattr(self, 'name', getattr(self, 'title', getattr(self, 'full_name', None)))
            if title_field:
                self.slug = slugify(title_field)
        super().save(*args, **kwargs)

    class Meta:
        abstract = True # Tells Django not to build a physical table named AutoSlugModel






class State(models.Model):
    name = models.CharField(max_length=100, unique=True)

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="cities")



class Property(AutoSlugModel):
    PROPERTY_TYPES = [
        ('land', 'Land'),
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('shop', 'Shop'),
        ('hall', 'Hall'),
        ('commercial', 'Commercial'),
    ]

    STATUS_TYPES = [
        ('available', 'Available'),
        ('rented', 'Rented'),
        ('sold', 'Sold'),
    ]

    # Location hierarchy
    state = models.ForeignKey('State', on_delete=models.CASCADE, related_name="properties")
    city = models.ForeignKey('City', on_delete=models.CASCADE, related_name="properties")

    # Core property info
    title = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_TYPES, default='available')
    address = models.CharField(max_length=255)  # only revealed after payment
    description = models.TextField(blank=True)
    

    # Property details
    bedrooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    area_sqft = models.FloatField(blank=True, null=True)

    # Media
    image = models.ImageField(upload_to='property_images/', blank=True, null=True)

    # Ownership
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.title} - {self.city.name}, {self.state.name}"

    class Meta:
        verbose_name_plural = 'Properties'    


    # SEPARATE SLUG FUNCTION LOGIC FROM THE CUSTOM CLASS
    def save(self, *args, **kwargs):
        if not self.slug: # Check if a slug doesn't exist yet
            # Piecing together the custom match text structure
            property_identity = f"{self.title} {self.property_type} {self.location_hint}"
            # slugify turns "Python vs JavaScript 2026-06-09" into "python-vs-javascript-2026-06-09"
            self.slug = slugify(property_identity)
            
        # Call the actual save method to commit changes to the database
        super().save(*args, **kwargs)    

   
class Inquiry(models.Model):
    propertY = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry on {self.propertY.title} by {self.name}"
   



# Action Photos Model
class PropertyImages(models.Model):
    title = models.CharField(max_length=20, default='', blank=True, null=True)
    images = models.ImageField(upload_to='uploads/Property_Images/',blank=True, null=True)  # This will automatically create a folder in the project directory.
    property_type = models.ForeignKey('Property', related_name='property_images', on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name_plural = 'Property Images'


