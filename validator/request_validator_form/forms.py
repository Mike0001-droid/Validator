from django import forms
from .models import BuildingConstruct, Value, Parameter

class DynamicForm(forms.Form):
    type_sk = forms.ModelChoiceField(
        queryset=BuildingConstruct.objects.all(),
        label="Тип СК",
        widget=forms.Select(attrs={'id': 'id_type_sk'})
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'type_sk' in self.data:
            try:
                type_sk_id = int(self.data.get('type_sk'))
                parameters = Parameter.objects.filter(bc_id=type_sk_id)
                for param in parameters:
                    field_name = f'param_{param.id}'
                    self.fields[field_name] = forms.CharField(
                        label=param.name,
                        required=False,
                        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3})
                    )
            except (ValueError, TypeError):
                pass