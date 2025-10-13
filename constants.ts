
import { ViewType, ViewConfig } from './types';

const BASE_PROMPT = "Generate a high-resolution photographic view of the subject from the provided reference image. Enforce studio soft lighting, a neutral background, and consistent geometry and colors across views. Maintain photorealism with no background clutter.";

export const VIEWS_CONFIG: ViewConfig[] = [
  { type: ViewType.FRONT, prompt: `Front view: a centered, straight-on photograph. ${BASE_PROMPT}` },
  { type: ViewType.BACK, prompt: `Back view: a centered photograph from the back. ${BASE_PROMPT}` },
  { type: ViewType.LEFT, prompt: `Left side view: a true 90-degree profile photograph from the left. ${BASE_PROMPT}` },
  { type: ViewType.RIGHT, prompt: `Right side view: a true 90-degree profile photograph from the right. ${BASE_PROMPT}` },
  { type: ViewType.TOP, prompt: `Top view: a bird's-eye photograph, looking directly down from above. ${BASE_PROMPT}` },
  { type: ViewType.BOTTOM, prompt: `Bottom view: a worm's-eye photograph, looking directly up from below. ${BASE_PROMPT}` },
];
