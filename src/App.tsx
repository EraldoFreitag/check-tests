import React from 'react';
import { Layout, Typography, ConfigProvider, Button, theme as antdTheme } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import FeatureList from './components/FeatureList';
import { ThemeProvider, useTheme } from './Context/ThemeContext';

const { Header, Content } = Layout;
const { Title } = Typography;

const ThemeWrapper: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  const algorithm = themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm: algorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh', backgroundColor: themeMode === 'dark' ? '#141414' : '#f0f2f5' }}>
        
        {/* Header */}
        <Header 
          style={{ 
            background: themeMode === 'dark' ? '#1f1f1f' : '#fff', 
            padding: '0 24px', 
            borderBottom: '1px solid #d1d1d1ff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={3} style={{ margin: 0, lineHeight: '64px', color: themeMode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.88)' }}>
            Checklist de Testes
          </Title>
          
          {/* Botão de Toggle do Tema */}
          <Button 
            type="text" 
            onClick={toggleTheme} 
            icon={themeMode === 'dark' ? <BulbFilled /> : <BulbOutlined />}
            style={{ color: themeMode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.88)' }}
          >
          </Button>
        </Header>
        
        {/* Conteúdo Principal */}
        <Content 
          style={{ 
            padding: '24px 50px', 
            flex: 1, 
          }}
        >
          <div style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            backgroundColor: themeMode === 'dark' ? '#1f1f1f' : '#fff', 
            padding: '24px', 
            borderRadius: '8px', 
            boxShadow: themeMode === 'dark' ? '0 2px 8px rgba(255, 255, 255, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.09)', 
          }}>
            <FeatureList />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

// Componente App que usa o ThemeProvider para envolver tudo
const App: React.FC = () => (
  <ThemeProvider>
    <ThemeWrapper />
  </ThemeProvider>
);

export default App;