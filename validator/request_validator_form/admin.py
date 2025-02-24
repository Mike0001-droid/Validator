from django.contrib import admin
from .models import RequestValidation

@admin.register(RequestValidation)
class RequestValidationAdmin(admin.ModelAdmin):
    pass