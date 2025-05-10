export const MensajesValidacionInput: any = {
    default: 'Este campo no es válido',
    required: '',
    email: 'Ingresa una dirección de correo válida, ejemplo: “example@hotmail.com , quipux@gmail.com”.',
    number: 'Este campo debe contener al menos un número',
    upperCase: 'Este campo debe contener al menos una letra mayúscula',
    minLength: 'Este campo debe contener al menos 8 caracteres',
    invalidUsername: 'Este campo debe ser un email o un número de teléfono',
    invalidCredentials: 'Credenciales inválidas',
    usernameNotFound: 'Usuario no encontrado',
    emailNotFound: 'El email ingresado no se encuentra registrado',
} as const;