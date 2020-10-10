import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface SvgEquipLogoProps {
  className?: string;
}

const SvgEquipLogo: React.FC<SvgEquipLogoProps> = props => {
  return (
    <SvgIcon viewBox="0 0 200 173.205" {...props}>
      <path d="M50 0L0 86.602l50 86.603h100l50-86.603L150 0zm50 20.344a66.258 66.258 0 0166.258 66.258A66.258 66.258 0 01100 152.861a66.258 66.258 0 01-66.258-66.259A66.258 66.258 0 01100 20.344z" />
    </SvgIcon>
  );
};

export default SvgEquipLogo;