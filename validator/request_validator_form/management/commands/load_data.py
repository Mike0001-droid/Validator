import os
import django
from request_validator_form.models import BuildingConstruct, Parameter, Value
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'validator.settings')
django.setup()


class Command:
    help = 'Load data from JSON into the database'

    def handle(self, *args, **kwargs):
        from validator.request_validator_form.utils.js import param
        data = param

        # Создаем или обновляем BuildingConstruct
        building_constructs = {
            type_sk: BuildingConstruct.objects.get_or_create(
                type_sk=type_sk,
                defaults={'release': '1.0'}
            )[0]  # Берем объект, игнорируя флаг created
            for type_sk in data.keys()
        }

        # Подготавливаем данные для Parameter и Value
        parameters_to_create = []
        values_to_create = []

        # Собираем все параметры и их значения в плоскую структуру
        for type_sk, parameters in data.items():
            bc = building_constructs[type_sk]
            for param_name, param_values in parameters.items():
                # Создаем или обновляем Parameter
                param, created = Parameter.objects.get_or_create(
                    name=param_name,
                    bc_id=bc,
                    defaults={'order_index': str(len(parameters_to_create) + 1)}
                )
                parameters_to_create.append(param)

                # Подготавливаем данные для Value
                values_to_create.extend([
                    Value(value=value, parametr_id=param)
                    for value in param_values
                ])

        # Массовое создание Parameter и Value
        Parameter.objects.bulk_create(parameters_to_create, ignore_conflicts=True)
        Value.objects.bulk_create(values_to_create, ignore_conflicts=True)

        print('Data loaded successfully')