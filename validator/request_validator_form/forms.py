from django import forms
from .models import RequestValidation, Parameter
from convert_json.main import only_params


class RequestValidationForm(forms.ModelForm):
    class Meta:
        model = RequestValidation
        fields = ['sender', 'explanation', 'type_sk', 'chapter', 'release']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.type_sk:
            self.add_dynamic_fields(self.instance.type_sk)

    def add_dynamic_fields(self, type_sk):
        param_values = self.get_param_values_for_type_sk(type_sk)
        for field_name, field_config in param_values.items():
            field_type = self.get_field_type(field_config['type'])
            self.fields[field_name] = field_type(
                label=field_config.get('label', field_name),
                required=field_config.get('required', True)
            )

    def get_param_values_for_type_sk(self, type_sk):
        return only_params.get(type_sk, {})

    def get_field_type(self, field_type):
        field_types = {
            "CharField": forms.CharField,
            "IntegerField": forms.IntegerField,
            "FloatField": forms.FloatField,
            "BooleanField": forms.BooleanField,
        }
        return field_types.get(field_type, forms.CharField)

    def clean(self):
        cleaned_data = super().clean()
        type_sk = cleaned_data.get('type_sk')
        
        if type_sk:
            field_configs = self.get_param_values_for_type_sk(type_sk)
            for field_name in field_configs.keys():
                field_value = self.data.get(field_name)
                if field_value is not None:
                    cleaned_data[field_name] = field_value
        
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.save()
            
        type_sk = self.clean().get('type_sk')
        if type_sk:
            parameters_to_create = []
            field_configs = self.get_param_values_for_type_sk(type_sk)
            for field_name in field_configs.keys():
                value = self.cleaned_data.get(field_name)
                if value is not None:
                    parameters_to_create.append(
                        Parameter.objects.create(
                            request=instance,
                            name=field_name,
                            value=str(value)
                        )
                    )
            if parameters_to_create:
                Parameter.objects.bulk_create(parameters_to_create, ignore_conflicts=True)
        return instance