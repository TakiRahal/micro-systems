import { TextField, type TextFieldProps } from "@mui/material";
import { type FieldHookConfig, useField } from "formik";

type FieldInputProps = {
    name: string
} & TextFieldProps

const FieldInput: React.FC<FieldInputProps> = ({name, variant = 'outlined', value, ...rest}) => {

    const fieldHookConfig: FieldHookConfig<any> = {
        name,
    }
    const [field, { touched, error }, helpers] = useField(fieldHookConfig)
    
    // check if there is an error and input is touched whene the field is
    const hasError = !!(touched && error)

    return <TextField 
                name={name} 
                variant={variant} 
                error={hasError} 
                helperText={error} 
                value={value ? value : field.value ? field.value : ''}
                onChange={(evt: any) => {
                    helpers.setValue(evt.target.value)
                }}  
                {...rest}/>
}
export default FieldInput