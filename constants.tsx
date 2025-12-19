
import { Beat, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'COMMAND CENTER', href: '#home' },
  { label: 'BEAT ARSENAL', href: '#beats' },
  { label: 'THE PRODUCER', href: '#about' },
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
    imageUrl: 'https://picsum.photos/seed/tiberium/800/600',
    tags: ['Trap', 'Aggressive', 'Industrial'],
    description: 'A heavy-hitting trap beat with menacing synths and distorted 808s.'
  },
  {
    id: '2',
    title: 'GDI STRATEGY',
    bpm: 128,
    key: 'C Maj',
    price: 34.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    imageUrl: 'https://picsum.photos/seed/gdi/800/600',
    tags: ['Hip-Hop', 'Melodic', 'Success'],
    description: 'Triumphant horns and crisp percussion for that winner mentality.'
  },
  {
    id: '3',
    title: 'NOD STEALTH',
    bpm: 160,
    key: 'D# Min',
    price: 24.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    imageUrl: 'https://picsum.photos/seed/nod/800/600',
    tags: ['Dark', 'Phonk', 'Aggressive'],
    description: 'Fast-paced, dark energetic vibes for late-night sessions.'
  },
  {
    id: '4',
    title: 'ION CANNON',
    bpm: 140,
    key: 'A Min',
    price: 49.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    imageUrl: 'https://picsum.photos/seed/ion/800/600',
    tags: ['Trap', 'Space', 'Future'],
    description: 'Atmospheric textures combined with modern trap bounce.'
  },
  {
    id: '5',
    title: 'HARVESTER DRILL',
    bpm: 142,
    key: 'E Min',
    price: 29.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    imageUrl: 'https://picsum.photos/seed/drill/800/600',
    tags: ['Drill', 'Gritty', 'UK'],
    description: 'Sliding 808s and technical high-hat patterns.'
  },
  {
    id: '6',
    title: 'COMMANDER PROTOCOL',
    bpm: 95,
    key: 'G Min',
    price: 39.99,
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    imageUrl: 'https://picsum.photos/seed/commander/800/600',
    tags: ['Old School', 'Soulful', 'Smooth'],
    description: 'Classic hip-hop groove with a soulful sample flip.'
  }
];
