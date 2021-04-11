from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as UAdmin
from .models import User

class UserAdmin(UAdmin):
    date_hierarchy = 'date_joined'
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Contact Detail', {
            'fields': ('phone_number', 'email')
        }),
        ('Info', {
            'fields': ('last_login', 'date_joined', 'groups', 'user_permissions')
        }),
        ('Advanced Options', {
            'classes': ('collapse',),
            'fields': ('is_phone_verified', 'is_active', 'is_staff', 'is_superuser')
        })
    )

    list_display = (
        'id',
        'username',
        'phone_number',
        'email',
        'is_phone_verified',
        'is_active',
        'is_staff',
        'is_superuser',
    )

    list_display_links = (
        'username',
        'phone_number',
        'email',
    )

    list_editable = (
        'is_phone_verified',
        'is_active',
        'is_staff',
    )

    list_filter = (
        'is_active',
        'is_staff',
        'is_phone_verified',
        'is_superuser',
    )

    search_fields = (
        'username',
        'phone_number',
        'email',
        'first_name',
        'last_name'
    )

admin.site.register(User, UserAdmin)