
import { Beat, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'COMMAND CENTER', href: '#home' },
  { label: 'AUDIO ARSENAL', href: '#beats' },
  { label: 'INTEL', href: '#about' },
  { label: 'COMMS', href: '#contact' },
];

export const BEATS: Beat[] = [
  {
    id: '1',
    title: 'TIBERIUM RUSH',
    bpm: 145,
    key: 'F# Min',
    price: 29.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
    tags: ['Trap', 'Aggressive', 'Industrial'],
    description: 'Heavy-hitting munitions for the front lines. Distorted 808s and aggressive lead synths.'
  },
  {
    id: '2',
    title: 'GDI STRATEGY',
    bpm: 128,
    key: 'C Maj',
    price: 34.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-f814d871d111?auto=format&fit=crop&q=80&w=800',
    tags: ['Hip-Hop', 'Melodic', 'Success'],
    description: 'Triumphant brass sections and precision-engineered percussion. Command respect.'
  },
  {
    id: '3',
    title: 'NOD STEALTH',
    bpm: 160,
    key: 'D# Min',
    price: 24.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    tags: ['Dark', 'Phonk', 'Aggressive'],
    description: 'Cloaked in darkness. Fast high-hats and eerie atmospheric layers for late-night ops.'
  },
  {
    id: '4',
    title: 'ION CANNON',
    bpm: 140,
    key: 'A Min',
    price: 49.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    tags: ['Trap', 'Space', 'Future'],
    description: 'Orbital strike of bass. Atmospheric textures combined with modern bounce.'
  },
  {
    id: '5',
    title: 'HARVESTER DRILL',
    bpm: 142,
    key: 'E Min',
    price: 29.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800',
    tags: ['Drill', 'Gritty', 'UK'],
    description: 'Technical high-hat patterns and sliding 808s engineered for the concrete jungle.'
  },
  {
    id: '6',
    title: 'COMMANDER PROTOCOL',
    bpm: 95,
    key: 'G Min',
    price: 39.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800',
    tags: ['Soulful', 'Smooth', 'Vinyl'],
    description: 'Classic soulful groove with a tactical edge. Strategic sample flip for high-tier lyricism.'
  }
];
