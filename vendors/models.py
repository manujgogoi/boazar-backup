from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Vendor(models.Model):
    name = models.CharField(max_length=80)
    user = models.OneToOneField(User, related_name='vendor', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

    def username(self):
        return self.user.username

class Staff(models.Model):
    vendor = models.ForeignKey(Vendor, related_name='staff', on_delete=models.CASCADE)
    user = models.OneToOneField(User, related_name='staff_user', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

