Got it, Solomon — let’s write this as a **real documentation** for your Real Estate project, covering everything we’ve discussed from the very beginning: models, serializers, members app, installed packages, and authentication (JWT + Google login).  

---

# 📘 Real Estate Project Documentation

## 1. Project Overview
This project is a **Real Estate platform** built with **Django REST Framework (DRF)**.  
It allows agents, owners, and developers to register, log in, and manage property listings.  
Authentication is handled via **JWT (SimpleJWT)** and **Google OAuth (django‑allauth + dj‑rest‑auth)**.

---

## 2. Installed Packages
The following packages were installed to support the project:

- **Django REST Framework** → API development.  
- **djangorestframework-simplejwt** → JWT authentication.  
- **django-allauth** → Social authentication (Google, Facebook, etc.).  
- **dj-rest-auth** → REST endpoints for login, logout, registration, and social login.  

---

## 3. Models
### User Model
Extended from Django’s `AbstractUser` to include real estate‑specific fields:

```python
class User(AbstractUser):
    role = models.CharField(max_length=20, choices=[('agent','Agent'),('owner','Owner'),('developer','Developer')])
    phone = models.CharField(max_length=15, blank=True, null=True)
    agency_name = models.CharField(max_length=100, blank=True, null=True)
```

### Property Model
Represents real estate listings:

```python
class Property(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
```

---

## 4. Serializers
### UserSerializer
Used for listing users.

```python
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','role','phone','agency_name']
```

### RegisterSerializer
Ensures password hashing during signup.

```python
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password','first_name','last_name','role','phone','agency_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
```

---

## 5. Views
### Registration
```python
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
```

### User List
```python
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
```

---

## 6. Authentication (JWT)
### Endpoints
- `/members/login/` → `TokenObtainPairView` (returns access + refresh tokens).  
- `/members/logout/` → `TokenBlacklistView` (blacklists refresh token).  
- `/members/token/refresh/` → `TokenRefreshView` (issues new access token).  

### Custom Login
Subclassed to return extra user info (id, role, phone, agency).

---

## 7. Social Authentication (Google)
### Endpoints
- `/auth/` → login/logout/password reset.  
- `/auth/registration/` → signup.  
- `/auth/social/` → Google login.  

### Flow
1. User clicks “Login with Google” in frontend.  
2. Redirects to Google OAuth consent screen.  
3. Google returns token → Django verifies via `allauth`.  
4. User created (if new) → JWT tokens issued.  

---

## 8. Professional Best Practices
- ✅ Use JWT for all API authentication.  
- ✅ Subclass login view to include user profile info.  
- ✅ Add Google login via `dj-rest-auth` + `allauth`.  
- ✅ Keep JWT as the backbone for all authentication flows.  
- ✅ Add email verification for new signups.  
- ✅ Enforce role-based permissions (agents, owners, developers).  

---

## 9. Next Steps
To make the app production‑ready:
- Add **email verification** for new users.  
- Configure **CORS + HTTPS** for frontend integration.  
- Implement **role-based access control** for property management.  
- Add monitoring (e.g., **UptimeRobot**) and error tracking (e.g., **Sentry**).  




## 10. Database Migration
### Purpose
Apply all model definitions (`User`, `Property`, `Inquiry`) into the database schema.

### Key Fixes Before Migration
- Added `rest_framework.authtoken` to `INSTALLED_APPS` (required by `dj-rest-auth`).  
- Added `allauth.account.middleware.AccountMiddleware` to `MIDDLEWARE`.  
- Installed missing dependency: `requests` (required by `django-allauth`).  
- Updated `Inquiry.user` to reference `settings.AUTH_USER_MODEL` instead of `auth.User`.

### Result
- All migrations applied successfully.  
- Custom `User` model and related tables (`Property`, `Inquiry`) now exist in the database.  
- Ready for superuser creation and testing.


## 11. Inquiry Model
### Purpose
Track inquiries made by potential buyers or renters about properties.

### Implementation
```python
from django.conf import settings

class Inquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry on {self.property.title} by {self.name}"
```

### Notes
- `user` is optional (nullable) to allow anonymous inquiries.  
- `related_name='inquiries'` enables reverse lookup from `Property`.  
- `__str__` provides a readable representation in admin.

---

## 12. Next Steps (Testing)
When ready to test:
1. **Create Superuser** → `python manage.py createsuperuser`  
2. **Test JWT Login** → `/members/login/`  
3. **Test Profile Endpoint** → `/members/me/` with access token  
4. **Test Registration** → `/members/register/`  
5. **Test Google Login** → `/auth/social/`  

---

## 13. Future Enhancements
- **Role-Based Permissions**:  
  - Agents → can post properties.  
  - Owners → can manage their listings.  
  - Developers → can add projects.  

- **Email Verification**: Ensure new users confirm their email before login.  
- **Property Features**: Add images, pricing filters, search functionality.  
- **Monitoring**: Integrate UptimeRobot for uptime tracking.  
- **Frontend Integration**: Use templates like Resido or Rentiz for UI.

---

## 🎯 Summary
- Project is now fully migrated with a custom user model.  
- Inquiry model correctly references `settings.AUTH_USER_MODEL`.  
- Authentication stack (JWT + Google login) is ready for testing.  
- Next phase is **testing endpoints** and then building out property features with role-based permissions.  






# Acre — Real Estate Platform

A full-stack real estate web application built with **Django REST Framework** on the backend and **React (Vite)** on the frontend. The platform provides user authentication (JWT-based), dynamic property listings, and role-based permissions for users and agents.

---

## 🛠️ Tech Stack

### Backend

* **Framework:** Django 5.x & Django REST Framework (DRF)
* **Authentication:** JSON Web Tokens (JWT) via `djangorestframework-simplejwt`
* **Database:** SQLite (Development) / PostgreSQL (Production)
* **Language:** Python 3.10+

### Frontend

* **Framework:** React 18+ (Vite)
* **Routing:** React Router v6
* **Styling:** CSS Modules / Vanilla CSS
* **HTTP Client:** Fetch API

---

## 🚀 Key Features & Implementation Details

### 1. Custom JWT Authentication & User Payload

Instead of returning standard token pairs (`access` and `refresh`), the login endpoint is customized via a `CustomTokenObtainPairSerializer` to return user profile data directly in the login response:

* Dynamic UI header updates showing `Hi, <username/first_name>` or standard authentication links depending on session state.
* Token storage handled seamlessly via `localStorage`.
* Integrated logout functionality with token cleanup and auto-redirection.

### 2. Relational Foreign Key Handling (`CreateProperty`)

To prevent invalid inputs and maintain data integrity:

* `State` and `City` fields are linked as Foreign Keys in the Django `Property` model.
* The frontend fetches available states dynamically from `/api/states/`.
* Selecting a state triggers a dependent fetch for `/api/cities/?state_id=<id>`, dynamically populating the city options.

---

## 📁 Project Structure

```text
REALSTATEAPP/
├── backend/
│   ├── backend/               # Django root configuration
│   ├── members/               # User authentication & profile app
│   │   ├── models.py          # Custom User model
│   │   ├── serializers.py     # Register & Custom Token serializers
│   │   ├── views.py           # Custom TokenObtainPairView & RegisterView
│   │   └── urls.py            # Auth routes (/api/members/)
│   └── properties/            # Property listings, states, cities app
│       ├── models.py          # Property, State, City models
│       ├── serializers.py     # Property & Location serializers
│       ├── views.py           # Property CRUD & Dependent location APIs
│       └── urls.py            # Property routes (/api/properties/)
│
└── frontend/
    └── realestateproject/
        ├── public/            # Static icons & SVGs
        └── src/
            ├── authentications/
            │   ├── Login.jsx  # Handles JWT generation & state storage
            │   └── Register.jsx
            ├── components/
            │   ├── Header.jsx # Auth-aware navbar with logout action
            │   └── Footer.jsx
            ├── CreateProperty.jsx # Dynamic dependent dropdown property form
            └── App.jsx        # Route management

```

---

## 🔑 API Endpoints

### Authentication (`/api/members/`)

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/members/register/` | Register a new user | No |
| `POST` | `/api/members/login/` | Obtain JWT tokens (`access`, `refresh`) + `user` object | No |
| `POST` | `/api/members/logout/` | Blacklist refresh token | Yes |
| `POST` | `/api/members/token/refresh/` | Obtain new access token | No |

### Properties & Locations (`/api/`)

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `GET` | `/api/states/` | List all registered states | No |
| `GET` | `/api/cities/?state_id=<id>` | List cities filtered by state ID | No |
| `POST` | `/api/properties/create/` | Create a new property listing | Yes (`Bearer Token`) |

---

## ⚙️ Setup and Installation

### 1. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start development server
python manage.py runserver

```

### 2. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend/realestateproject

# Install dependencies
npm install

# Run Vite development server
npm run dev

```

---

## 🛡️ Environment & Security Notes

* Ensure `CORS_ALLOWED_ORIGINS` in Django's `settings.py` includes `http://localhost:5173`.
* Pass the access token in the `Authorization` header for protected endpoints:
```text
Authorization: Bearer <your_access_token>

```



---

How does this look for your repository? If you'd like to adjust any sections or add extra setup commands, feel free to ask!