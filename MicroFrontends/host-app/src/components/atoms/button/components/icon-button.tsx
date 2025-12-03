import { ListIcons } from '../../../../config/constant';
import { IconButton, type IconButtonProps } from '@mui/material';

type CIconButtonProps = {
  icon: string
} & IconButtonProps
const CIconButton: React.FC<CIconButtonProps> = ({ icon, ...rest }) => {
  return (
    <IconButton {...rest}>{ListIcons[icon]}</IconButton>
  );
};

export default CIconButton;