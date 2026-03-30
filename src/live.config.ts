import { defineLiveCollection } from 'astro:content';
import { remoteLiveLoader } from '../loaders';

export const collections = {
    remote_live_integrations: defineLiveCollection({
        type: 'live',
        loader: remoteLiveLoader({
            path: "content/en/integrations",
            owner: "DataDog",
            repo: "websites-sources",
            branch: "auto-build-preview-3ccfbb4a",
        })
    }),
};