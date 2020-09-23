import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render, screen, cleanup, act } from '@testing-library/react';
import ProfileRenderModal from '../components/pages/Modal/ProfileRenderModal'
import { useOktaAuth } from '@okta/okta-react';

afterEach(() => {
  cleanup();
});
jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {
        isAuthenticated: true,
      },
      authService: {},
    };
  },
}));


describe('<ProfileRenderModal /> test suite', () => {
    test('Tell us who you are - Displaying', () => {
        render(
            <Router>
                <ProfileRenderModal />
            </Router>
        );
        expect(screen.getByText(/So we can direct you to the right place, please let us know who you are/i)).toBeInTheDocument();
    })
} )

