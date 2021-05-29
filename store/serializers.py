from rest_framework import serializers
from .models import (Product, ProductImage, ProductType, ProductSpecification, ProductSpecificationValue, Category,)

class ImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'


class ProductTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductSpecification
        fields = '__all__'


class ProductSpecificationValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecificationValue
        fields = '__all__'

class ProductCreateSerializer(serializers.ModelSerializer):
    product_specification_values = ProductSpecificationValueSerializer(many=True)
    product_images = ImageSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'


class ProductDemoSerializer(serializers.ModelSerializer):
    product_image = ImageSerializer(many=True, read_only=True)
    product_specification_values = ProductSpecificationValueSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

