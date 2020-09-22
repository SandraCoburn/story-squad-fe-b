import React from 'react';
import ProfileRenderModal from '../components/pages/Modal/ProfileRenderModal'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useOktaAuth } from "@okta/okta-react";



jest.mock('@okta/okta-react', () => ({
    useOktaAuth: () => {
        return {
            authState: {},
            authService: {}
        };
    }
}));



describe('<ProfileModalContainer test suite', () => {
    test('renders without crashing', () => {
        render(
            <ProfileRenderModal />
        );
        expect(screen.findByText('So we can direct you')).toBeInTheDocument();
    });
});

