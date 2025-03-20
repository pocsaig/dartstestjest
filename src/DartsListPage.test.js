import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsListPage } from './DartsListPage';

jest.mock('axios');

describe('DartsListPage Component Tests', () => {
  const mockDarts = [
    {
      id: 1,
      name: 'John Doe',
      birth_date: '1990-01-01',
      world_ch_won: 5,
      profile_url: 'https://external.profile',
      image_url: 'image1.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      birth_date: '1985-05-15',
      world_ch_won: 3,
      profile_url: '/internal/profile',
      image_url: ''
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockDarts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading spinner initially', () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should render darts list after data fetch', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Dartsozók')).toBeInTheDocument();
    });

    const cards = screen.getAllByRole('group');
    expect(cards).toHaveLength(mockDarts.length);

    mockDarts.forEach((dart, index) => {
      const card = cards[index];

      expect(within(card).getByText(`Dartsozó neve: ${dart.name}`)).toBeInTheDocument();
      expect(within(card).getByText(`Születési éve: ${dart.birth_date}`)).toBeInTheDocument();
      expect(within(card).getByText(`Nyert világbajnokságai: ${dart.world_ch_won}`)).toBeInTheDocument();

      const profileLink = within(card).getByRole('link', { name: /profile link/i });
      expect(profileLink).toHaveAttribute('href', dart.profile_url);
      if (dart.profile_url.startsWith('http')) {
        expect(profileLink).toHaveAttribute('target', '_blank');
      } else {
        expect(profileLink).not.toHaveAttribute('target');
      }

      const image = within(card).queryByAltText(dart.name);
      if (dart.image_url) {
        expect(image).toHaveAttribute('src', dart.image_url);
      } else {
        expect(image).toHaveAttribute('src', 'https://via.placeholder.com/400x800');
      }

      expect(within(card).getByRole('button', { name: /részletek/i }).closest('a'))
        .toHaveAttribute('href', `/darts/${dart.id}`);

      expect(within(card).getByRole('button', { name: /szerkesztés/i }).closest('a'))
        .toHaveAttribute('href', `/mod-darts/${dart.id}`);

      expect(within(card).getByRole('button', { name: /törlés/i }).closest('a'))
        .toHaveAttribute('href', `/del-darts/${dart.id}`);
    });
  });

  test('should handle different profile URL types correctly', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      
      const externalLink = links.find(link => link.getAttribute('href') === 'https://external.profile');
      expect(externalLink).toHaveAttribute('target', '_blank');

      const internalLink = links.find(link => link.getAttribute('href') === '/internal/profile');
      expect(internalLink).not.toHaveAttribute('target');
    });
  });
});
