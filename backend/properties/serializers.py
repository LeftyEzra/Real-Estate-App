# This serializer.py files is a translator between complex data types,
# like django models and simple data fotmat like JSON or XML.
# The purpose is to convert python datatypes into JSON, XML or other content datatypes.
# Also convert parsed data back into complex data types, after cross checking and validating the incoming data.
# For every Foriegn Key you want to display as a name from .models, Use StringRelatedField.

from rest_framework import serializers
from .models import Property, State, City, PropertyImages, User, Inquiry
from django.contrib.auth.models import User
from members.serializers import UserSerializer









# Creating a PropertyImages serializer
class StateSerializer(serializers.ModelSerializer):
    cities_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = State
        fields = '__all__'
        
# Creating a PropertyImages serializer
class CitySerializer(serializers.ModelSerializer):   
    state = serializers.SlugRelatedField(slug_field='name',queryset=State.objects.all()) 
    class Meta:
        model = City
        fields = '__all__'

# Creating a PropertyImages serializer
class PropertyImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = '__all__'
        read_only_fields = ['slug']




class PropertySerializer(serializers.ModelSerializer):
    # WHAT IT DOES: Calls __str__() on the related model (returns string like "Lagos" or "Ikeja")
    # WHEN TO USE IT: Only on read-only endpoints (GET requests).
    # WARNING: It is READ-ONLY by default. Do NOT use this if you need to submit POST/PUT requests!
    state = serializers.StringRelatedField()
    city = serializers.StringRelatedField()
    # Nest the User to display every detail about the user
    owner = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    # WHAT IT DOES: Matches the relation using a specific text field (e.g., slug_field='name')
    # WHEN TO USE IT: When the frontend or Insomnia sends string names (like "Lagos") instead of IDs.
    # WHY `queryset=...` IS NEEDED: Tells DRF where in the database to verify if "Lagos" exists when saving.
    # SUPPORTS POST? Yes! Works for both GET and POST.
    state = serializers.SlugRelatedField(slug_field='name', queryset=State.objects.all(), required=False, allow_null=True)
    city = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all(), required=False, allow_null=True)



    # Match the related_name='property_images' set on your ForeignKey
    property_images = PropertyImagesSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['slug', 'owner']




class InquirySerializer(serializers.ModelSerializer):
    recipient = serializers.StringRelatedField(read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Inquiry
        fields = ['id', 'recipient', 'user', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
