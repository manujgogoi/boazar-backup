from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.auth import get_user_model

User = get_user_model()
class Category(MPTTModel):
    """
    Category table implemented with MPTT
    """
    name = models.CharField(
        verbose_name=_("Category Name"),
        help_text=_("Required and unique"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_("Category safe URL"), max_length=255, unique=True)
    parent = TreeForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="children")
    is_active = models.BooleanField(default=True)

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def get_absolute_url(self):
        return reverse("store:category_list", kwargs={"slug": self.slug})

    def __str__(self):
        return self.name
    
class ProductType(models.Model):
    """
    ProductType table will provide a list of the different types
    of products that are for sale.
    """
    name = models.CharField(verbose_name=_("Product Type Name"), help_text=_("Required"), max_length=255)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Product Type")
        verbose_name_plural = _("Product Types")

    def __str__(self):
        return self.name

class ProductSpecification(models.Model):
    """
    The product specification table contains product
    specification or features for the product type
    """
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    name = models.CharField(verbose_name=_("Spec. Name"), help_text=_("Required"), max_length=255)

    class Meta:
        verbose_name = _("Product Specification")
        verbose_name_plural = _("Product Specifications")

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    The Product table contains all product items
    """
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(verbose_name=_("Title"), help_text=_("Required"), max_length=255)
    description = models.TextField(verbose_name=_("Description"), help_text=_("Not Required"), blank=True)
    slug = models.SlugField(max_length=255)
    is_feature = models.BooleanField(default=False)
    quantity = models.IntegerField(verbose_name=_("Quantity"), help_text=_("Optional"), null=True, blank=True)
    wholesale_min_quantity = models.IntegerField(verbose_name=_("Wholesale Minimum Quantity"), help_text=_("Optional"), null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    regular_price = models.DecimalField(
        verbose_name=_("Regular Price"),
        help_text=_("Maximum 99999.99"),
        error_messages={
            "name": {
                "max_length": _("The price must be between 0 and 99999.99"),
            },
        },
        max_digits=7,
        decimal_places=2,
    )
    discount_price = models.DecimalField(
        verbose_name=_("Discount Price"),
        help_text=_("Maximum 99999.99"),
        error_messages={
            "name": {
                "max_length": _("The price must be between 0 and 99999.99 - Optional"),
            },
        },
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True
    )
    wholesale_price = models.DecimalField(
        verbose_name=_("Wholesale Price"),
        help_text=_("Maximum 99999.99"),
        error_messages={
            "name": {
                "max_length": _("The price must be between 0 and 99999.99 - Optional"),
            },
        },
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True
    )

    is_active = models.BooleanField(
        verbose_name=_("Product visibility"),
        help_text=_("Change product visibility"),
        default=True,
    )
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def get_absolute_url(self):
        return reverse("store:product_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title
    
class ProductSpecificationValue(models.Model):
    """
    The Product Specification Value table holds each of the 
    products individual specification or bespoke features.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_specification_values")
    specification = models.ForeignKey(ProductSpecification, on_delete=models.RESTRICT)
    value = models.CharField(
        verbose_name=_("Value"),
        help_text=_("Product specification value (maximum of 255 characters"),
        max_length=255,
    )
    
    class Meta:
        verbose_name = _("Product Specification Value")
        verbose_name_plural = _("Product Specification Values")
    
    def __str__(self):
        return self.value

class ProductImage(models.Model):
    """
    The Product Image table
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_image")
    image = models.ImageField(
        verbose_name=_("image"),
        help_text=_("Upload a product image"),
        upload_to="images/products/",
        default="images/products/default.png",
    )
    alt_text = models.CharField(
        verbose_name=_("Alternative text"),
        help_text=_("Please add alternative text"),
        max_length=255,
        null=True,
        blank=True,
    )
    slug = models.SlugField(max_length=255)
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product Image")
        verbose_name_plural = _("Product Images")