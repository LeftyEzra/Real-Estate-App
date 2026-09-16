from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework import mixins
from django.shortcuts import get_object_or_404
from .models import  Property, State, City, Inquiry, PropertyImages
from .serializers import PropertySerializer, StateSerializer, InquirySerializer, PropertyImagesSerializer
from datetime import datetime, timedelta # Module to represent the fifference between two dates
from django.utils.timezone import now
from django .utils import timezone
from calendar import HTMLCalendar
from datetime import date
from django.contrib import messages
from django.db.models import Q

@api_view(['GET'])
def getData(request):
    time = datetime.now()#.strftime("%H:%M")
    context = {'name' : "Python Language", 
               'Purpose': 'RestFrame Work Tutorial',
               'time': 'time'}
    return Response(context)



# Property Create
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser  # <--- Import parsers
class PropertyCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # <--- Add this line

    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            # Automatically assign the logged-in user as the owner
            serializer.save(owner=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Property Create
class PropertyListView(APIView):
    def get(self, request, format=None):
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Property Detail, Update and Delete
class PropertyDetailView(APIView):

    def get(self, request, slug, format=None):
        try:
            property_detail = get_object_or_404(Property, slug=slug)
        except Property.DoesNotExist:
            return Response({'error': 'Property Not Found'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PropertySerializer(property_detail)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        property_detail = get_object_or_404(Property, slug=slug)
        serializer = PropertySerializer(property_detail, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        property_detail = get_object_or_404(Property, slug=slug)
        property_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##########################################################################
##########################################################################
##########################################################################

# Payment Create
class StateCreateView(APIView):
    def post(self, request):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class StateListView(APIView):
    def get(self, request, format=None):
        states = State.objects.all()
        serializer = StateSerializer(State, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

# Payment Create
class CityCreateView(APIView):
    def post(self, request):
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


# Property Create
class CityListView(APIView):
    def get(self, request, format=None):
        city = City.objects.all()
        serializer = CitySerializer(State, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




##########################################################################
##########################################################################
##########################################################################

# Inquiry Create
class InquiryCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # <--- Add this line
    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



# Property Create
class InquiryListView(APIView):
    def get(self, request, format=None):
        inquiries = Inquiry.objects.all()
        serializer = InquirySerializer(inquiries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InquiryDetailView(APIView):

    def get(self, request, slug, format=None):
        try:
            inquiry = get_object_or_404(Inquiry, slug=slug)
        except inquiry.DoesNotExist:
            return Response({'error': 'Not Found :('}, status=status.HTTP_400_BAD_REQUEST)

        serializer = InquirySerializer(inquiry)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        inquiry = get_object_or_404(Inquiry, slug=slug)
        serializer = InquirySerializer(inquiry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        inquiry = get_object_or_404(Inquiry, slug=slug)
        inquiry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



##########################################################################
##########################################################################
##########################################################################

# Payment Create
class PropertyImagesCreateView(APIView):
    def post(self, request):
        serializer = PropertyImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



# Property Create
class PropertyImagesListView(APIView):
    def get(self, request, format=None):
        propertyImages = PropertyImages.objects.all()
        serializer = PropertyImagesSerializer(propertyImages, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PropertyImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertyImagesDetailView(APIView):

    def get(self, request, slug, format=None):
        try:
            propertyImages = get_object_or_404(PropertyImages, slug=slug)
        except PropertyImages.DoesNotExist:
            return Response({'error': 'Member Not Found :('}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PropertyImagesSerializer(propertyImages)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        propertyImages = get_object_or_404(PropertyImages, slug=slug)
        serializer = PropertyImagesSerializer(propertyImages, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        propertyImages = get_object_or_404(PropertyImages, slug=slug)
        propertyImages.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)















