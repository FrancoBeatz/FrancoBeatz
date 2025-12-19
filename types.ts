
export interface Beat {
  id: string;
  title: string;
  bpm: number;
  key: string;
  price: number;
  previewUrl: string;
  imageUrl: string;
  tags: string[];
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
