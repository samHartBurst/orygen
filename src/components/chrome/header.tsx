import React, { FunctionComponent, useState } from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiContextMenuPanel,
  EuiPopover,
  useGeneratedHtmlId,
  EuiContextMenuItem,
  EuiButtonEmpty,
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiText,
} from '@elastic/eui';
import Link from 'next/link';

const Header: FunctionComponent = ({}) => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isAvatarPopoverOpen, setAvatarPopover] = useState(false);
  const userName = 'Matt Emerson';

  const smallContextMenuPopoverId = useGeneratedHtmlId({
    prefix: 'smallContextMenuPopover',
  });

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const avatarPopoverId = useGeneratedHtmlId({
    prefix: 'avatarPopover',
  });

  const onAvatarClick = () => {
    setAvatarPopover(!isAvatarPopoverOpen);
  };

  const closeAvatarPopover = () => {
    setAvatarPopover(false);
  };

  const renderTitle = (
    <Link href={'/'}>
      <EuiHeaderLogo iconType={'/icons/aepcc-logo.png'}>
        <EuiText size="relative">
          <h1>AEPCC</h1>
        </EuiText>
      </EuiHeaderLogo>
    </Link>
  );

  const renderDashboard = (
    <Link href={'/dashboard'}>
      <EuiButtonEmpty>
        <EuiText>
          <h4 style={{ color: '#0071c2' }}>Dashboard</h4>
        </EuiText>
      </EuiButtonEmpty>
    </Link>
  );

  const renderClients = (
    <Link href={'/clients'}>
      <EuiButtonEmpty>
        <EuiText>
          <h4 style={{ color: '#0071c2' }}>Clients</h4>
        </EuiText>
      </EuiButtonEmpty>
    </Link>
  );

  const renderAdmin = (
    <EuiButtonEmpty
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}>
      <EuiText>
        <h4 style={{ color: '#0071c2' }}>Admin</h4>
      </EuiText>
    </EuiButtonEmpty>
  );

  const popoverItems = [
    <Link href={'/admin/manageServices'}>
      <EuiContextMenuItem icon={'spacesApp'} size="m">
        Manage Services
      </EuiContextMenuItem>
    </Link>,
    <Link href={'/admin/manageUsers'}>
      <EuiContextMenuItem icon={'user'} size="m">
        Manage Users
      </EuiContextMenuItem>
    </Link>,
    <Link href={'/admin/manageMedications'}>
      <EuiContextMenuItem icon={'heartbeatApp'} size="m">
        Manage Medications
      </EuiContextMenuItem>
    </Link>,
  ];

  const avatarPopoverItems = [
    <EuiContextMenuItem disabled icon={'usersRolesApp'} size="m">
      {userName}
    </EuiContextMenuItem>,
    <Link href={'/settings/changePassword'}>
      <EuiContextMenuItem icon={'link'} size="m">
        Change Password
      </EuiContextMenuItem>
    </Link>,
    <EuiContextMenuItem icon={'exit'} size="m">
      Logout
    </EuiContextMenuItem>,
  ];

  const renderAdminButton = (
    <EuiPopover
      id={smallContextMenuPopoverId}
      button={renderAdmin}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <EuiContextMenuPanel size="s" items={popoverItems} />
    </EuiPopover>
  );

  const renderUser = (
    <EuiHeaderSectionItemButton aria-label="Account menu">
      <EuiButtonEmpty onClick={onAvatarClick}>
        <EuiAvatar name={userName} size="l" />
      </EuiButtonEmpty>
    </EuiHeaderSectionItemButton>
  );

  const renderUserButton = (
    <EuiPopover
      id={avatarPopoverId}
      button={renderUser}
      isOpen={isAvatarPopoverOpen}
      closePopover={closeAvatarPopover}
      panelPaddingSize="none"
      anchorPosition="downLeft">
      <EuiContextMenuPanel size="s" items={avatarPopoverItems} />
    </EuiPopover>
  );

  const sections = [
    {
      items: [renderTitle, renderDashboard, renderClients, renderAdminButton],
    },
    {
      items: [renderUserButton],
    },
  ];

  return <EuiHeader sections={sections} />;
};

export default Header;
