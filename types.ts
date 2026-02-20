export interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  tone: 'formal' | 'casual' | 'playful' | 'tech';
  hostName: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'generated';
}

export enum TemplateId {
  MINIMAL_POP = 'minimal_pop',
  TECH_NEON = 'tech_neon',
  ELEGANT_SERIF = 'elegant_serif',
  BOLD_BRUTAL = 'bold_brutal',
  RETRO_VAPOR = 'retro_vapor',
  CORPORATE_PRO = 'corporate_pro',
  LUXE_GOLD = 'luxe_gold',
  ABSTRACT_GEO = 'abstract_geo',
  TYPO_SWISS = 'typo_swiss',
  NATURE_SOFT = 'nature_soft',
  GLITCH_PUNK = 'glitch_punk',
  FILM_NOIR = 'film_noir',
  Y2K_AESTHETIC = 'y2k_aesthetic',
  PAPER_CRAFT = 'paper_craft'
}

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  previewColor: string;
}

export interface TemplateCustomization {
  colorPalette: 'default' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'candy';
  fontStyle: 'modern' | 'classic' | 'mono' | 'playful';
}

export enum AppStep {
  ANALYZE = 'ANALYZE',
  STYLE = 'STYLE',
  BATCH = 'BATCH'
}

export enum AppView {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  WORKSPACE = 'WORKSPACE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  planDetails?: {
    id: string;
    name: string;
    maxEvents: number;
    maxGuestsPerEvent: number;
  };
}

export interface Project {
  id: string;
  name: string;
  date: string;
  guestCount: number;
  status: 'Draft' | 'Sent';
}
