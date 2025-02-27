from django.contrib import admin
from .models import Value, Parameter, BuildingConstruct


@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    pass

@admin.register(Value)
class ValueAdmin(admin.ModelAdmin):
    pass

@admin.register(BuildingConstruct)
class BuildingConstructAdmin(admin.ModelAdmin):
    pass