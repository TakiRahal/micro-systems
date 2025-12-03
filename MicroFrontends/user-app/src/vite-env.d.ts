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

declare module 'HostApp/Container' {
  const Container: React.FC<any>;
  export default Container;
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
    messageNoDataFound?: string
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

declare module 'HostApp/List' {
  const List: React.FC<any>;
  export default List;
};

declare module 'HostApp/ListItem' {
  const ListItem: React.FC<any>;
  export default ListItem;
};
declare module 'HostApp/ListItemAvatar' {
  const ListItemAvatar: React.FC<any>;
  export default ListItemAvatar;
};
declare module 'HostApp/ListItemText' {
  const ListItemText: React.FC<any>;
  export default ListItemText;
};
declare module 'HostApp/Typography' {
  const Typography: React.FC<any>;
  export default Typography;
};
declare module 'HostApp/Divider' {
  const Divider: React.FC<any>;
  export default Divider;
};
declare module 'HostApp/Avatar' {
  const Avatar: React.FC<any>;
  export default Avatar;
};
