import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import {
  LoginButton,
  LogoutButton,
  useSession,
} from '@inrupt/solid-ui-react';

import Link from 'next/link';

function TopNavigation() {
  const { session } = useSession();

  return (
    <div>
      <Navbar color="light" expand="md" className="mb-4" container light>
        <Link href="/" passHref>
          <NavbarBrand>
            Solid Demo
          </NavbarBrand>
        </Link>

        <Nav className="me-auto" navbar>
          <NavItem>
            <Link href="/podInfo" passHref>
              <NavLink>
                Pod Info
              </NavLink>
            </Link>
          </NavItem>
        </Nav>

        {!session.info.isLoggedIn && (
          <LoginButton
            oidcIssuer="https://login.inrupt.com"
            authOptions={{
              clientName: 'Inrupt Demo',
            }}
          >
            <Button color="primary">Log In</Button>
          </LoginButton>
        )}

        {session.info.isLoggedIn && (
          <NavbarText className="me-2 text-end" tag="div">
            Logged in as {session.info.webId}
          </NavbarText>
        )}

        {session.info.isLoggedIn && (
          <LogoutButton>
            <Button color="primary">Log Out</Button>
          </LogoutButton>
        )}
      </Navbar>
    </div>
  );
}

export default TopNavigation;
