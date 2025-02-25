from django.contrib import admin
from .models import RequestValidation, Parameter

@admin.register(RequestValidation)
class RequestValidationAdmin(admin.ModelAdmin):
    pass

@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    pass