from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import DynamicForm
from .models import Parameter, Value
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def dynamic_form_view(request):
    if request.method == 'POST':
        form = DynamicForm(request.POST)
        if form.is_valid():
            type_sk = form.cleaned_data['type_sk']
            for key, value in form.cleaned_data.items():
                if key.startswith('param_'):
                    param_id = int(key.split('_')[1])
                    param = Parameter.objects.get(id=param_id)
                    Value.objects.filter(parametr_id=param).delete()
                    for val in value.split(','):
                        Value.objects.create(value=val.strip(), parametr_id=param)
            return redirect('http://127.0.0.1:8000/admin/request_validator_form/value/')
    else:
        form = DynamicForm()
    return render(request, 'request_validation_form.html', {'form': form})

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
        value = request.POST.get('value')
        print(value)
        if value:
            try:
                param = Parameter.objects.get(id=param_id)
                Value.objects.create(value=value, parametr_id=param)
                print("Результат",Value.objects.get(value=value))
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)
        else:
            return JsonResponse({'success': False, 'error': 'Value is required'}, status=400)
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)