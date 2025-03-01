from django.contrib import admin
from django.urls import path
from django.urls import path
from request_validator_form.views import dynamic_form_view, \
get_parameters, add_value, new_template, save_construct


urlpatterns = [
    path('admin/', admin.site.urls),
    path('dynamic-form/', dynamic_form_view, name='dynamic-form'),
    path('get-parameters/<int:type_sk_id>/', get_parameters, name='get-parameters'),
    path('add-value/<int:param_id>/', add_value, name='add-value'),
    path('new-template/', new_template, name='new-template'),
    path('save-construct/', save_construct, name='save-construct'),

]
