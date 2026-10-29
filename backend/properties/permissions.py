from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        # Everyone can view
        if request.method in permissions.SAFE_METHODS:
            return True

        # Admin can edit anything
        if request.user.is_staff:
            return True

        # Owner can edit their own property
        return obj.owner == request.user