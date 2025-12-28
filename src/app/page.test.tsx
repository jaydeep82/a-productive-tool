import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
    it('renders the hero title', () => {
        render(<Home />);
        const title = screen.getByText(/Master Your Workflow with/i);
        expect(title).toBeInTheDocument();
    });

    it('contains the "Get Started" button', () => {
        render(<Home />);
        const button = screen.getByRole('button', { name: /Get Started/i });
        expect(button).toBeInTheDocument();
    });
});
