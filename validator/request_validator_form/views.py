from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import DynamicForm
from .models import Parameter, Value
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import TypeBuildingConstruct, Parameter, Value, NewValueRequest, BuildingConstruct


def dynamic_form_view(request):
    building_constructs = TypeBuildingConstruct.objects.all()
    parameters_data = []
    type_sk_id = request.GET.get('type_sk')
    if type_sk_id:
        parameters = Parameter.objects.filter(bc_id=type_sk_id)
        for param in parameters:
            values = Value.objects.filter(parametr_id=param).values_list('value', flat=True)
            parameters_data.append({
                'id': param.id,
                'name': param.name,
                'values': list(values),
            })
    return render(request, 'request_validation_form.html', {
        'building_constructs': building_constructs,
        'parameters_data': parameters_data,
        'form': DynamicForm(),
    })


def get_parameters(request, type_sk_id):
    parameters = Parameter.objects.filter(bc_id=type_sk_id)
    data = []
    for param in parameters:
        values = Value.objects.filter(parametr_id=param).values_list('value', flat=True)
        data.append({
            'id': param.id,
            'name': param.name,
            'values': list(values),
        })
    return JsonResponse(data, safe=False)


@csrf_exempt
def add_value(request, param_id):
    if request.method == 'POST':
        value = request.POST.get('value', '').strip()
        if value:
            try:
                param = Parameter.objects.get(id=param_id)
                Value.objects.create(
                    value=value,
                    parametr_id=param,
                )
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)
        else:
            return JsonResponse({'success': False, 'error': 'Значение не может быть пустым'}, status=400)
    return JsonResponse({'success': False, 'error': 'Недопустимый метод запроса'}, status=405)


@csrf_exempt
def save_construct(request):
    if request.method == 'POST':
        type_sk_id = request.POST.get('type_sk_id')
        data_string = request.POST.get('data_string')
        explanation = request.POST.get('explanation')
        chapter = request.POST.get('chapter')
        release = request.POST.get('release')

        if type_sk_id and data_string:
            try:
                type_sk = TypeBuildingConstruct.objects.get(id=type_sk_id)
                type_sk.release = release
                type_sk.chapter = chapter
                type_sk.save()
                new_value_request = NewValueRequest.objects.create(
                    user_id="current_user_id",
                    explanation=explanation
                )
                BuildingConstruct.objects.create(
                    type_sk=type_sk,
                    data_string=data_string,
                    value_request_id = new_value_request
                )
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)
        else:
            return JsonResponse({'success': False, 'error': 'Недостаточно данных'}, status=400)
    return JsonResponse({'success': False, 'error': 'Недопустимый метод запроса'}, status=405)

def new_template(request):
    return render(request, 'new_template.html')