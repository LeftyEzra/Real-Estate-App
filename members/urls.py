from django.urls import path,  include
from .views import RegisterView, UserListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,   # Login view: validates username/password and returns JWT tokens
    TokenRefreshView,      # Refresh view: issues a new access token using a valid refresh token
    TokenBlacklistView,    # Logout view: blacklists the refresh token so it can’t be used again
)

urlpatterns = [

    path('register/', RegisterView.as_view(), name='user-register'),
    path('users/', UserListView.as_view(), name='user-list'),


    # LOGIN:
    # - User sends username + password
    # - If valid, returns two tokens:
    #   1. access → short-lived, used in Authorization header
    #   2. refresh → long-lived, used to get new access tokens
    path('login/', TokenObtainPairView.as_view(), name='login'),

    # LOGOUT:
    # - User sends their refresh token
    # - That token is blacklisted (marked invalid)
    # - Prevents further use, effectively logging the user out
    path('logout/', TokenBlacklistView.as_view(), name='logout'),

    # REFRESH:
    # - User sends a valid refresh token
    # - Returns a new access token
    # - Keeps the user logged in without re-entering credentials
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    # dj-rest-auth endpoints (registration, password reset, social login)
    #path('auth/', include('dj_rest_auth.urls')),              
    #path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    #path('auth/social/', include('allauth.socialaccount.urls')), 
]

