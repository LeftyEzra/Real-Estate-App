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

    #member = serializers.StringRelatedField()
    class Meta:
        model = State
        fields = '__all__'
        
# Creating a PropertyImages serializer
class CitySerializer(serializers.ModelSerializer):

    #member = serializers.StringRelatedField()
    class Meta:
        model = City
        fields = '__all__'

# Creating a PropertyImages serializer
class PropertyImagesSerializer(serializers.ModelSerializer):

    #member = serializers.StringRelatedField()
    class Meta:
        model = PropertyImages
        fields = '__all__'
        read_only_fields = ['slug']




class PropertySerializer(serializers.ModelSerializer):
    # Show owner,  state and city names instead of IDs
    state = serializers.StringRelatedField()
    city = serializers.StringRelatedField()
    # Nest the User to display every detail about the user
    owner = UserSerializer(read_only=True)

    # Match the related_name='property_images' set on your ForeignKey
    property_images = PropertyImagesSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['slug', 'owner']


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
