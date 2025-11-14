import React from 'react';
import { Button, Space, theme } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';

interface HeaderActionsProps {
  featureId: string;
  onToggleAll: (featureId: string, concluido: boolean) => void;
  allCompleted: boolean; 
  token?: any; 
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ featureId, onToggleAll, allCompleted, token }) => {
  const { themeMode } = useTheme();

  const toggleText = allCompleted ? 'Desmarcar Todos' : 'Marcar Todos';
  const isPrimaryAction = !allCompleted;
  
  const icon = isPrimaryAction ? <CheckOutlined /> : <CloseOutlined />;
  
  const color = isPrimaryAction ? token.colorSuccess : token.colorError;
  const colorText = isPrimaryAction ? token.colorSuccessText : token.colorErrorText;

  const buttonStyle: React.CSSProperties = {
      backgroundColor: themeMode === 'light' ? '#f5f5f5' : 'transparent', 
      borderColor: color,
      color: colorText,
  };

  const handleClick = () => {
    onToggleAll(featureId, !allCompleted);
  };

  return (
    <Space onClick={e => e.stopPropagation()}>
      <Button 
        type="default"
        icon={icon} 
        size="small"
        onClick={handleClick}
        style={buttonStyle} 
      >
        {toggleText}
      </Button>
    </Space>
  );
};

const { useToken } = theme;

const HeaderActionsWithTheme: React.FC<Omit<HeaderActionsProps, 'token'>> = (props) => {
    const { token } = useToken();
    return <HeaderActions {...props} token={token} />;
};

export default HeaderActionsWithTheme;