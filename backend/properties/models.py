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
    name = models.CharField(max_length=100)
    slug = models.SlugField(null=True, blank=True)
    image = models.ImageField(upload_to='states_images/', null=True, blank=True)

    def save(self, *args, **kwargs):
        # Automatically generate slug from name if not provided
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class City(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='cities_images/', blank=True, null=True)
    state = models.ForeignKey('State', on_delete=models.CASCADE, related_name="cities")






class PropertyType(models.TextChoices):
    ANY_TYPE = 'any type', 'Any Type'
    LAND = 'land', 'Land'
    HOUSE = 'house', 'House'
    APARTMENT = 'apartment', 'Apartment'
    SHOP = 'shop', 'Shop'
    HALL = 'hall', 'Hall'
    COMMERCIAL = 'commercial', 'Commercial'

class Property(AutoSlugModel):


    STATUS_TYPES = [
        ('for rent', 'For Rent'),
        ('for sale', 'For Sale'),
        ('sold', 'Sold'),
        ('just listed', 'Just Listed'),
    ]

    # Location hierarchy
    state = models.ForeignKey('State', on_delete=models.CASCADE, related_name="properties", blank= True, null=True)
    city = models.ForeignKey('City', on_delete=models.CASCADE, related_name="properties", blank= True, null=True)

    # Core property info
    title = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PropertyType.choices, default=PropertyType.ANY_TYPE)
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
    features = models.JSONField(default=list, blank=True, help_text="List of amenities")
    

    # Ownership
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        state = self.state.name if self.state else "No State"
        city = self.city.name if self.city else "No City"
        return f"{self.title} - {city}, {state}"    

    class Meta:
        verbose_name_plural = 'Properties'    


    # SEPARATE SLUG FUNCTION LOGIC FROM THE CUSTOM CLASS
    def save(self, *args, **kwargs):
        if not self.slug: # Check if a slug doesn't exist yet
            # Piecing together the custom match text structure
            property_identity = f"{self.title} {self.property_type}"
            # slugify turns "Python vs JavaScript 2026-06-09" into "python-vs-javascript-2026-06-09"
            self.slug = slugify(property_identity)
            
        # Call the actual save method to commit changes to the database
        super().save(*args, **kwargs)    

   
class Inquiry(models.Model):
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inquiries_received',
        default=0
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry on {self.recipient} by {self.name}"
   



# Action Photos Model
class PropertyImages(models.Model):
    slug = models.SlugField(unique=True, blank=True, null=True)
    title = models.CharField(max_length=20, default='', blank=True, null=True)
    images = models.ImageField(upload_to='uploads/Property_Images/',blank=True, null=True)  # This will automatically create a folder in the project directory.
    property_type = models.ForeignKey('Property', related_name='property_images', on_delete=models.CASCADE, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name_plural = 'Property Images'


       


