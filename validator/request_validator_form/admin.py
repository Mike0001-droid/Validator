from django.contrib import admin
from .models import Value, Parameter, TypeBuildingConstruct, \
    NewValueRequest, BuildingConstruct


@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    pass

@admin.register(Value)
class ValueAdmin(admin.ModelAdmin):
    pass

@admin.register(TypeBuildingConstruct)
class TypeBuildingConstructAdmin(admin.ModelAdmin):
    pass

@admin.register(NewValueRequest)
class NewValueRequestAdmin(admin.ModelAdmin):
    pass

@admin.register(BuildingConstruct)
class BuildingConstructAdmin(admin.ModelAdmin):
    pass