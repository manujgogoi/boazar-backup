from django.urls import path

from . import views

app_name = 'store'

urlpatterns = [
    path('products/', views.ProductListAPIView.as_view(), name='store_products'),
    path('products/slug:slug>/', views.ProductDetailView.as_view(), name='product'),
    path('products/category/<slug:slug>/', views.CategoryItemView.as_view(), name='category_item'),
    path('products/types/', views.ProductTypesListView.as_view(), name='store_product_types'),
    path('categories/', views.CategoriesListView.as_view(), name='store_categories_list'),
    path('specifications/type/<int:product_type>/', views.ProductSpecificationByTypeListView.as_view(), name='specifications_by_type'),

    path('products/new/', views.ProductCreateAPIView.as_view(), name='store_product_add'),
    path('products/demo/', views.ProductDemoListAPIView.as_view(), name='store_product_demo_list'),
]