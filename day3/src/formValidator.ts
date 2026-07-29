type Rule<T = unknown> = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (v: T) => string | null;
};

class FormValidator<T extends Record<string, unknown>> {
    constructor(
        private form: T,
        private rules: { [K in keyof T]?: Rule<T[K]> }
    ) {
        this.form = form;
        this.rules = rules;
    }
    validate(field: { id: string; value: unknown }): {
        valid: boolean;
        errors: Partial<Record<keyof T, string>>;
    } {
        if (!this.rules[field.id]) return { valid: true, errors: {} };

        let id: keyof T = field.id;
        let errors: Partial<Record<keyof T, string>> = {};
        const fieldRules = this.rules[field.id];
        let flag = 0;
        for (let fieldRule in fieldRules) {
            switch (fieldRule) {
                case "required": {
                    if (fieldRules["required"]) {
                        if (
                            typeof field.value === "string" &&
                            field.value.trim() === ""
                        ) {
                            flag = 1;
                            let errorMessage = "This field is required.";
                            errors[id] =
                                errors[id] === undefined
                                    ? errorMessage
                                    : errors[id] + errorMessage;
                        }
                    }
                    break;
                }
                case "minLength": {
                    if (
                        fieldRules["minLength"] &&
                        typeof field.value === "string" &&
                        fieldRules["minLength"] > field.value.length
                    ) {
                        flag = 1;
                        let errorMessage = ` minimum length is ${fieldRules["minLength"]}.`;
                        errors[id] =
                            errors[id] === undefined
                                ? errorMessage
                                : errors[id] + errorMessage;
                    }
                    break;
                }
                case "pattern": {
                    if (
                        fieldRules["pattern"] &&
                        typeof field.value === "string" &&
                        !fieldRules["pattern"].test(field.value)
                    ) {
                        flag = 1;
                        let errorMessage = `Pattern doesnt match`;
                        errors[id] =
                            errors[id] === undefined
                                ? errorMessage
                                : errors[id] + errorMessage;
                    }
                    break;
                }
                case "custom": {
                    if (fieldRules["custom"]) {
                        let result = fieldRules["custom"](
                            field.value as T[string]
                        );

                        if (result !== null) {
                            flag = 1;
                            errors[id] =
                                errors[id] === undefined
                                    ? result
                                    : errors[id] + result;
                        }
                    }
                    break;
                }
            }
        }

        return { valid: flag === 0 ? true : false, errors: errors };
    }
    validateAll() {
        let errors: Partial<Record<keyof T, string>> = {};
        let flag = 0;
        Object.keys(this.rules).forEach((key) => {
            let validatedValue = this.validate({
                id: key,
                value: this.form[key],
            });
            if (validatedValue.valid === false) flag = 1;
            Object.assign(errors, validatedValue.errors);
        });
        return { valid: flag === 0 ? true : false, errors: errors };
    }
}

//--------------------------------------------Test------------------------------

type Form = {
    name: string;
    password: string;
    username: string;
    age: number;
};

let rules: Partial<Record<keyof Form, Rule>> = {
    name: { required: true, minLength: 10 },
    password: { required: true },
    username: { required: true, minLength: 10 },
    age: {
        required: true,
        custom: (age) => {
            if (typeof age === "number")
                return age < 18 ? "age must be above 18" : null;
            return null;
        },
    },
};

let form: Form = {
    name: "winston churchill",
    password: "oyrazabaal",
    username: "",
    age: 10,
};
let form2: Form = {
    name: "winston churchill",
    password: "oyrazabaal",
    username: "Barack obama",
    age: 20,
};

const formValidator = new FormValidator<Form>(form, rules);
console.log(formValidator.validateAll());

const formValidator2 = new FormValidator<Form>(form2, rules);
console.log(formValidator2.validateAll());
