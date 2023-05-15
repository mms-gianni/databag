import { Modal, Dropdown, Menu, Tooltip } from 'antd';
import { Logo } from 'logo/Logo';
import { IdentityWrapper, ErrorNotice, InfoNotice } from './Identity.styled';
import { useIdentity } from './useIdentity.hook';
import { LogoutOutlined, InfoCircleOutlined, ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';

export function Identity({ openAccount, openCards, cardUpdated }) {

  const [modal, modalContext] = Modal.useModal();
  const { state, actions } = useIdentity();

  const logout = () => {
    modal.confirm({
      title: 'Are you sure you want to logout?',
      icon: <LogoutOutlined />,
      bodyStyle: { padding: 16 },
      onOk() {
        actions.logout();
      },
      onCancel() {},
    });
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={openAccount}>Account</div>
      </Menu.Item>
      <Menu.Item key="1">
        <div onClick={openCards}>Contacts</div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={logout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} overlayStyle={{ minWidth: 0 }} trigger={['click']} placement="bottomRight">
      <IdentityWrapper>
        { modalContext }
        { state.init && (
          <Logo url={state.url} width={40} height={40} radius={4} />
        )}
        <div className="label">
          <div className="name">{state.name}</div>
          <div className="handle">
            <div className="notice">
              { state.status !== 'connected' && ( 
                <Tooltip placement="right" title="disconnected from server">
                  <ErrorNotice>
                    <ExclamationCircleOutlined />
                  </ErrorNotice>
                </Tooltip>
              )}
            </div>
            <div>{state.handle}</div>
            <div className="notice">
              { cardUpdated && (
                <Tooltip placement="right" title="contacts have updated">
                  <InfoNotice>
                    <InfoCircleOutlined />
                  </InfoNotice>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        <div className="drop">
          <DownOutlined clasName="dropIcon" />
        </div>
      </IdentityWrapper>
    </Dropdown>
  );
}


