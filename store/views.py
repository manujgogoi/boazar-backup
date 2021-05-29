from django.contrib import auth
from django.shortcuts import render
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Product, Category, ProductType, ProductSpecification
from .serializers import (ProductDemoSerializer, 
                            ProductSerializer, 
                            ProductTypesSerializer, 
                            CategorySerializer, 
                            ProductSpecificationSerializer, 
                            ProductCreateSerializer,
                            ProductDemoSerializer)
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter


class MyPagination(PageNumberPagination):
    page_size = 5

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    pagination_class =  MyPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('title', 'description', 'category__name')



class ProductDetailView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoriesListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer    
class CategoryItemView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(
            category__in=Category.objects.get(slug=self.kwargs["slug"]).get_descendants(include_self=True)
        )

class ProductTypesListView(generics.ListAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypesSerializer

class ProductSpecificationByTypeListView(generics.ListAPIView):
    serializer_class = ProductSpecificationSerializer

    """
    This view should return a list of all the specifications
    for the currently selected Product type
    """
    def get_queryset(self):
        productType = self.kwargs['product_type']
        return ProductSpecification.objects.filter(product_type_id=productType)



class ProductCreateAPIView(generics.CreateAPIView):
    serializer_class = ProductCreateSerializer

class ProductDemoListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDemoSerializer