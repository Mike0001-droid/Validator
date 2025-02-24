from django.db import models
from convert_json.js import param

params = ((param, param) for param in list(param.keys()))

class RequestValidation(models.Model):
    sender = models.CharField("Отправитель", max_length=255)
    date_send = models.DateTimeField("Дата и время отправки", auto_created=True, null=True, blank=True)
    explanation = models.TextField("Пояснение", max_length=500)
    type_sk = models.CharField("Тип СК", choices=params, max_length=44)
    chapter = models.CharField("Раздел", max_length=50)
    release = models.IntegerField("Релиз")
    param_values = models.JSONField("Параметры", null=True, blank=True)