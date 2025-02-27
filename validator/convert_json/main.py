from validator.request_validator_form.utils.js import param

only_params = {}
for key, index in param.items():
    only_params[key] = {}
    b_values = {}
    for value in list(index.keys()):
        b_values[value] = {"type": "CharField", "label": f"{value}", "required": "true"}
    only_params[key] = b_values
