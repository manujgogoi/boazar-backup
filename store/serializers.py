from rest_framework import serializers
from .models import Product, ProductImage

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "slug", "is_feature"]

class ProductSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'category', 'title', 'description', 'regular_price', 'slug', 'product_image']

