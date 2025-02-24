from django.contrib import admin
from django.urls import path
from django.urls import path
from request_validator_form.views import request_validation_view, GetDynamicFieldsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('request-validation/', request_validation_view, name='request_validation'),
    path('get-dynamic-fields/', GetDynamicFieldsView.as_view(), name='get_dynamic_fields'), 
]
