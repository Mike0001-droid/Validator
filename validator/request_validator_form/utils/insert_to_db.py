import os, sys
sys.path.append('C:/Users/major/Validator/validator')
os.environ['DJANGO_SETTINGS_MODULE'] = 'validator.settings'
import django
django.setup()
from request_validator_form.models import BuildingConstruct, Parameter, Value
from js import param


data = param
def main():
    building_constructs = {}
    for type_sk in data.keys():
        bc, _ = BuildingConstruct.objects.get_or_create(
            type_sk=type_sk,
            defaults={'release': '1.0'}
        )
        building_constructs[type_sk] = bc

    parameters_to_create = []
    values_to_create = []
    existing_values = set()

    for type_sk, parameters in data.items():
        bc = building_constructs[type_sk]
        order_index = 1 

        for param_name, param_values in parameters.items():
            param, _ = Parameter.objects.get_or_create(
                name=param_name,
                bc_id=bc,
                defaults={'order_index': str(order_index)}
            )
            parameters_to_create.append(param)
            order_index += 1

            for value in param_values:
                key = (value, param.id)
                if key not in existing_values:
                    values_to_create.append(Value(value=value, parametr_id=param))
                    existing_values.add(key)

    Parameter.objects.bulk_create(parameters_to_create, ignore_conflicts=True)
    Value.objects.bulk_create(values_to_create, ignore_conflicts=True)

main()