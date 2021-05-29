from django.urls import path
from .views import BecomeVendorAPIView, VendorDetailAPIView

app_name='vendors'

urlpatterns = [
    path('become_vendor', BecomeVendorAPIView.as_view(), name='api-become-vendor' ),
    path('vendor_detail', VendorDetailAPIView.as_view(), name='api-vendor-detail')
]
