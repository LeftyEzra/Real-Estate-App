# This serializer.py files is a translator between complex data types,
# like django models and simple data fotmat like JSON or XML.
# The purpose is to convert python datatypes into JSON, XML or other content datatypes.
# Also convert parsed data back into complex data types, after cross checking and validating the incoming data.
# For every Foriegn Key you want to display as a name from .models, Use StringRelatedField.

# members/serializers.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone', 'profile_picture', 'agency_name'
        ]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'first_name', 'last_name',
            'role', 'phone', 'profile_picture', 'agency_name'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)
