/// <reference types="vite/client" />

declare module 'HostApp/Button' {
  const Button: React.FC<any>;
  export default Button;
};

declare module 'HostApp/IconButton' {
  const IconButton: React.FC<any>;
  export default IconButton;
};

declare module 'HostApp/Card' {
  const Card: React.FC<{
      cardMedia?: {
          image: string,
          title: string
      }
      topTitle?: ReactNode
      title?: ReactNode
      subTitle?: ReactNode
      body?: ReactNode
      cardActions?: ReactNode
  }>;
  export default Card
};
declare module 'HostApp/Box' {
  const Box: React.FC<any>;
  export default Box;
};
declare module 'HostApp/Stack' {
  const Stack: React.FC<any>;
  export default Stack;
};

declare module 'HostApp/FieldInput' {
  const FieldInput: React.FC<any>;
  export default FieldInput;
};

declare module 'HostApp/CircularProgress' {
  const CircularProgress: React.FC<any>;
  export default CircularProgress;
};

declare module 'HostApp/Grid' {
  const Grid: React.FC<any>;
  export default Grid;
};

declare module 'HostApp/Snackbar' {
  const Snackbar: React.FC<any>;
  export default Snackbar;
};

declare module 'HostApp/Formik' {
  export { type FieldHookConfig, useField, Formik };
};

declare module 'HostApp/ApiService'{
  export const invokeWS = <any>(endpoint: any, requestData?: any, options?: any) => any
};

declare module 'HostApp/DataTable'{
  const DataTable: React.FC<{
    data: any,
    columns: any,
    isLoading?: boolean
  }>;
  export default DataTable;
}

declare module 'HostApp/PageContainer' {
  const PageContainer: React.FC<{
      title: string
      actions?: ReactNode;
  } & PropsWithChildren>;
  export default PageContainer;
};


declare module 'HostApp/Dialog' {
  const Dialog: React.FC<{
    open: boolean
    onClose: () => void
    dialogTitle?: string
    dialogContentText?: string
    dialogActions?: ReactNode
  }>;
  export default Dialog;
};