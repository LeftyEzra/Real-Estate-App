# ==========================================
# Standard Library Imports
# ==========================================
from calendar import HTMLCalendar
from datetime import date, datetime, timedelta

# ==========================================
#  Django Core & Database Imports
# ==========================================
from django.contrib import messages
from django.db.models import Q, Count
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.timezone import now

# ==========================================
# Third-Party Imports (Django REST Framework)
# ==========================================
from rest_framework import mixins, status, generics, filters
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

# ==========================================
#  Local App Imports (Models, Serializers, Permissions)
# ==========================================
from .models import City, Inquiry, Property, PropertyImages, State
from .permissions import IsOwnerOrReadOnly  # Custom object-level permission
from .serializers import (
    CitySerializer,
    InquirySerializer,
    PropertyImagesSerializer,
    PropertySerializer,
    StateSerializer,
)




# Property Create
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
class PropertyCreateView(APIView):
    # PERMISSION_CLASSES: Defines WHO is allowed to access this API endpoint
    # [permissions.IsAuthenticated] restricts access so ONLY logged-in users with valid 
    # authentication (Tokens/Sessions) can make requests. Unauthenticated users get a 401 Unauthorized error.
    permission_classes = [IsAuthenticated]
    
    parser_classes = [JSONParser, MultiPartParser, FormParser ]  # <--- Add this line

    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        if not serializer.is_valid():
            print("SERIALIZER ERRORS:", serializer.errors)
        if serializer.is_valid():
            # Automatically assign the logged-in user as the owner
            serializer.save(owner=request.user) 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Property Listings
class PropertyListView(APIView):
    def get(self, request, format=None):
        properties = Property.objects.all().select_related('state', 'city', 'owner')
        
        # Capture query parameters
        status_param = request.GET.get('status')
        property_type = request.GET.get('property_type')
        search_query = request.GET.get('search')
        max_price = request.GET.get('price__lte')
        bedrooms = request.GET.get('bedrooms')
        state = request.GET.get('state')
        city = request.GET.get('city')

        # Status filter
        if status_param:
            properties = properties.filter(status__iexact=status_param)

        # Property Type filter (matching choices in PropertyType)
        if property_type and property_type.lower() != 'any type':
            properties = properties.filter(property_type__iexact=property_type)

        # Location hierarchy filters
        if state:
            properties = properties.filter(state_id=state)
        if city:
            properties = properties.filter(city_id=city)

        # Price & Bedroom range filters
        if max_price:
            properties = properties.filter(price__lte=max_price)# Prices less than or equal to

        # 5. Filter by bedrooms (Using __gte to match 1+, 2+, etc.)
        if bedrooms:
            try:
                
                properties = properties.filter(bedrooms=int(bedrooms))
            except (ValueError, TypeError):
                pass    
        

        # Multi-field text search
        if search_query:
            properties = properties.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(address__icontains=search_query) |
                Q(city__name__icontains=search_query) |
                Q(state__name__icontains=search_query)
            )

        serializer = PropertySerializer(properties, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PropertySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






       

class PropertyDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request, slug, format=None):
        property_detail = get_object_or_404(Property, slug=slug)
        serializer = PropertySerializer(property_detail)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        property_detail = get_object_or_404(Property, slug=slug)
        
        # Enforces IsOwnerOrReadOnly check against property_detail
        self.check_object_permissions(request, property_detail)
        
        serializer = PropertySerializer(property_detail, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        property_detail = get_object_or_404(Property, slug=slug)
        
        # Enforces IsOwnerOrReadOnly check against property_detail
        self.check_object_permissions(request, property_detail)
        
        property_detail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

##########################################################################
##########################################################################
##########################################################################

# State Create
class StateCreateView(APIView):
    def post(self, request):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

# State List
class StateListView(APIView):
    def get(self, request, format=None):
        #states = State.objects.all().order_by('name')
        states = State.objects.annotate(cities_count=Count('cities')).order_by('name')
        serializer = StateSerializer(states, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

# City Create
class CityCreateView(APIView):
    def post(self, request):
        serializer = CitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


# City List
class CityListView(APIView):
    def get(self, request, format=None):
        cities = City.objects.all().order_by('name').select_related('state')
        cities_count = City.objects.count()
        states_count = State.objects.count()
        serializer = CitySerializer(cities, many=True)
        print("CITIES COUNT")
        print(cities_count)
        return Response({
                        'total_cities': cities_count, 
                        'total_states': states_count,
                        'cities':serializer.data
                        })

    def post(self, request, format=None):
        serializer = StateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class InquiryCreateView(APIView):
    def post(self, request):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            # If the sender is logged in, attach their account automatically
            if request.user.is_authenticated:
                serializer.save(user=request.user)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Iinquiry List
class InquiryListView(APIView):
    def get(self, request, format=None):
        inquiries = Inquiry.objects.all()#.select_related('proper')
        serializer = InquirySerializer(inquiries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Iinquiry Details
class InquiryDetailView(APIView):

    def get(self, request, slug, format=None):
        try:
            inquiry = get_object_or_404(Inquiry, slug=slug)
        except inquiry.DoesNotExist:
            return Response({'error': 'Not Found :('}, status=status.HTTP_400_BAD_REQUEST)

        serializer = InquirySerializer(inquiry)
        return Response(serializer.data)

    



##########################################################################
##########################################################################
##########################################################################

# Payment Image Create
class PropertyImagesCreateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        serializer = PropertyImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



# Property Image List
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
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request, slug, format=None):
        try:
            propertyImages = get_object_or_404(PropertyImages, slug=slug)
            # Enforces IsOwnerOrReadOnly check against property_detail
            self.check_object_permissions(request, propertYImages)
        except propertyImages.DoesNotExist:
            return Response({'error': 'Image Not Found :('}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PropertyImagesSerializer(propertyImages)
        return Response(serializer.data)

    def put(self, request, slug, format=None):
        propertyImages = get_object_or_404(PropertyImages, slug=slug)
        # Enforces IsOwnerOrReadOnly check against property_detail
        self.check_object_permissions(request, propertYImages)
        serializer = PropertyImagesSerializer(propertyImages, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        propertyImages = get_object_or_404(PropertyImages, slug=slug)
        propertyImages.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)















