import Button, { type ButtonProps } from '@mui/material/Button';
import { ListIcons } from '../../../../config/constant';

type CButtonProps = {
  startIcon: string
} & ButtonProps
const CButton: React.FC<CButtonProps> = ({ startIcon, children, ...rest }) => {
  return (
    <Button startIcon={startIcon ? ListIcons[startIcon] : undefined} {...rest}>{children}</Button>
  );
};

export default CButton;