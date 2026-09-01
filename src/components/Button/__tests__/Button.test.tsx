import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('renders children', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalled();
  });

  test('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        No
      </Button>
    );
    fireEvent.click(screen.getByText('No'));
    expect(onClick).not.toHaveBeenCalled();
  });

  test('renders as anchor when as="a"', () => {
    render(
      <Button as="a" href="https://example.com">
        Link
      </Button>
    );
    const link = screen.getByText('Link').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  test('shows loading state', () => {
    render(<Button loading>Load</Button>);
    const btn = screen.getByText('Load').closest('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });
});
