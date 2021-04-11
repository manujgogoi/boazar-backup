from django.contrib import admin
from .models import Vendor, Staff

class StaffInline(admin.TabularInline):
    model = Staff


class VendorAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = (
        'name',
        'username',
        'created_at',
    )
    inlines = [
        StaffInline,
    ]

admin.site.register(Vendor, VendorAdmin)
admin.site.register(Staff)
