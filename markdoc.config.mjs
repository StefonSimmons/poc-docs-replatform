// ./markdoc.config.json is used to configure the Markdoc extension on vscode and cursor

// This file configures Astro to use Markdoc. It uses an experimental integration (@astrojs/markdoc)
// However, in order to use starlight components as Markdoc `tags` (or rather use markdoc in starlight?), I need to extend this configuration to use the starlight-markdoc preset/config (@astrojs/starlight-markdoc).
// This not the case for .mdx. Why are focused on .mdoc when .mdx is less messy to configure and less experimental? Is it becasue hugo will not render mdoc and we are using mdoc for C-docs?
// see https://starlight.astro.build/guides/authoring-content/#add-markdoc-to-an-existing-project

import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';


export default defineMarkdocConfig({
    tags: {
        card: {
            render: component('@astrojs/starlight/components', 'Card'),
            attributes: {
                title: { type: String },
                icon: { type: String },
            },
        },
        cardgrid: {
            render: component('@astrojs/starlight/components', 'CardGrid'),
            attributes: {
                stagger: { type: Boolean },
            },
        },
        callout: {
            render: component('./src/components/Callout.astro'),
            attributes: {
                url: { type: String, default: ''}, 
                type: { type: String, default: 'default', matches: ['default', 'learn'], errorLevel: 'error'},
                hide_img: { type: Boolean, default: false },
                cta: { type: String, default: '' },
                header: { type: String, default: null }, 
                d_toggle: { type: Boolean, default: false }, 
                d_target : { type: String, default: ''},
                custom_class: { type: String, default: ''}
            },
        },
        whatsnext: {
            render: component('./src/components/WhatsNext.astro'),
            attributes: {
                further_reading: { type: Array, default: [] },
                desc: { type: String, default: 'Additional helpful documentation, links, and articles:' }
            }
        },
        nextlink: {
            render: component('./src/components/NextLink.astro'),
            attributes: {
                href: { type: String, required: true, errorLevel: 'error' },
                tag: { type: String, default: '' },
            }
        }

    },
    extends: [starlightMarkdoc()]
});