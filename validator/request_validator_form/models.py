from django.db import models


class NewValueRequest(models.Model):
    date_send = models.DateTimeField("Дата добавления", auto_now_add=True)
    user_id = models.CharField("ID пользователя", max_length=100, null=True, blank=True)
    explanation = models.TextField("Пояснение", max_length=500, null=True)
    def __str__(self):
        return f"{self.user_id} - {self.date_send}"


class Value(models.Model):
    value = models.CharField(max_length=255, db_index=True)
    parametr_id = models.ForeignKey('Parameter', on_delete=models.CASCADE, db_index=True)
    value_request_id = models.ForeignKey(
        'NewValueRequest', 
        on_delete=models.CASCADE, 
        related_name='values',
        null=True,
    )
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['value', 'parametr_id'],
                name='unique_value_per_parametr'
            )
        ]

    def __str__(self):
        return f"Значение - {self.value}"
    

class BuildingConstruct(models.Model):
    type_sk = models.ForeignKey(
        'TypeBuildingConstruct', 
        on_delete=models.CASCADE, 
        related_name='constructs',
    )
    data_string = models.CharField("Строка данных", max_length=255)

    def __str__(self):
        return self.data_string
    

class TypeBuildingConstruct(models.Model):
    type_sk = models.CharField("Название типа СК", max_length=255)
    release = models.CharField("Релиз", max_length=10)

    def __str__(self):
        return self.type_sk
    

class Parameter(models.Model):
    name = models.CharField("Название параметра", max_length=255, unique=False)
    bc_id = models.ForeignKey(
        'TypeBuildingConstruct', 
        on_delete=models.CASCADE, 
        related_name='parameters',
    )
    order_index = models.CharField("Порядковый номер парметра", max_length=255)

    def __str__(self):
        return f"{self.order_index}: {self.name}"