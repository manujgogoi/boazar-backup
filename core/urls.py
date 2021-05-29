from django.contrib import admin
from django.urls import path, include
from django.urls.conf import re_path

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('(^(?!(api|admin)).*$)', TemplateView.as_view(template_name='index.html')),
    path('api/accounts/', include('accounts.urls', namespace='accounts')),
    path('api/vendors/', include('vendors.urls', namespace='vendors')),
    path('api/store/', include('store.urls', namespace='store')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
