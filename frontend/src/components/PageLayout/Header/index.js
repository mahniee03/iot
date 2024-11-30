import { Layout } from 'antd';
import { FaNetworkWired } from 'react-icons/fa';
import './Header.scss';
const { Header } = Layout;

function PageHeader() {
  return (
    <Header
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1E3175',
        padding: '40 60px',
      }}
    >
      <a href="/" className="header__back">
        <div className="header__logo">
          {/* <FaNetworkWired /> */}
        </div>
        <div className="header__title">Minnie's Smart Home</div>
      </a>
    </Header>
  );
}

export default PageHeader;