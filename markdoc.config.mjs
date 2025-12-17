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
                custom_class: { type: String, default: ''}
            },
        },
        whatsnext: {
            render: component('./src/components/WhatsNext.astro'),
            attributes: {
                further_reading: { type: Array, default: [] },
                desc: { type: String, default: 'Additional helpful documentation, links, and articles:' },
                header: { type: String }
            }
        },
        nextlink: {
            render: component('./src/components/NextLink.astro'),
            attributes: {
                href: { type: String, required: true, errorLevel: 'error' },
                tag: { type: String, default: '' },
                hasArrow: { type: Boolean, default: true },
            }
        },
        platforms: {
            render: component('./src/components/Platforms.astro')
        },
        regionparam: {
            render: component('./src/components/RegionParam.astro'),
            attributes: {
                key: { type: String, required: true, errorLevel: 'error' },
                code: { type: String, default: '' },
                link: { type: String, default: '' },
                text: { type: String, default: '' },
            }
        },
        siteregion: {
            render: component('./src/components/SiteRegion.astro'),
            attributes: {
                region: { type: String, required: true, errorLevel: 'error' },
            }
        },
        multifiltersearch: {
            render: component('./src/components/MultiFilterSearch.astro'),
            attributes: {
                resource: { type: String, default: "" },
                fm_resource: { type: Object, default: {"headers": [], "data": []} },
            }
        },
        appsecintegration: {
            render: component('./src/components/AppSecIntegration.astro'),
            attributes: {
                link: { type: String, required: true, errorLevel: 'error' },
                name: { type: String, required: true, errorLevel: 'error' },
                src: { type: String, default: '' },
                avatar: { type: String, default: '' },
            }
        },
        appsecintegrations: {
            render: component('./src/components/AppSecIntegrationWrapper.astro'),
        },
        tabgroup: {
            // Custom TabGroup component
            render: component('./src/components/TabGroup.astro'),
            attributes: {
                syncKey: { type: String },
            }
        },
        tab: {
            // Custom Tab component
            render: component('./src/components/Tab.astro'),
            attributes: {
                label: { type: String, required: true, errorLevel: 'error' },
            }
        },
        mappingtable: {
            render: component('./src/components/MappingTable.astro'),
            attributes: {
                resource: { type: String, required: true, errorLevel: 'error' },
            }
        },
        productavailability: {
            render: component('./src/components/ProductAvailability.astro'),
            attributes: {
                products: { type: Array, required: true, errorLevel: 'error' },
                names: { type: String, default: ''},
            }
        },
        serverlessinitenvvarssidecar: {
            render: component('./src/components/ServerlessInitEnvVarsSidecar.astro'),
            attributes: {
                language: { type: String, required: true, errorLevel: 'error' },
                defaultSource: { type: String, required: true, errorLevel: 'error' },
                hasFunction: { type: Boolean },
            }
        },
        cloudsiemcontentpacks: {
            render: component('./src/components/CloudSiemContentPacks.astro'),
        },
        collapsiblecontent: {
            render: component('./src/components/CollapsibleContent.astro'),
            attributes: {
                title: { type: String, required: true, errorLevel: 'error' },
                headerLevel: { type: String, default: 'h3', matches: ['h3', 'h4', 'h5', 'h6'] },
                expanded: { type: Boolean, default: false },
                inline: { type: Boolean, default: false },
            }
        },
        dsmtracerversion: {
            render: component('./src/components/DSMTracerVersion.astro'),
            attributes: {
                lang: { type: String, required: true, errorLevel: 'error', matches: ['java', 'python', 'dotnet', 'nodejs', 'go', 'ruby'] },
                lib: { type: String, required: true, errorLevel: 'error' },
                type: { type: String, required: true, errorLevel: 'error', matches: ['minimal', 'recommended'] },
            }
        },
        tooltip: {
            render: component('./src/components/Tooltip.astro'),
            attributes: {
                text: { type: String, default: '' },
                tooltip: { type: String, default: '' },
                glossary: { type: String, default: '' },
                textCase: { type: String, required: true, errorLevel: 'error', matches: ['title', 'lower', 'upper'] },
            }
        },
        agentconfig: {
            render: component('./src/components/AgentConfig.astro'),
            attributes: {
                type: { type: String, required: true, errorLevel: 'error' },
                filename: { type: String, default: 'Code example' },
                collapsible: { type: Boolean, default: false },
                disable_copy: { type: Boolean, default: false }
            }
        },
        versions: {
            render: component('./src/components/Versions.astro'),
            attributes: {
                key: { type: String, required: true, errorLevel: 'error' }
            }
        },
        appandapiprotectionnavigation: {
            render: component('./src/components/AppAndApiProtectionNavigation.astro'),
            attributes: {
                language: { type: String, required: true, errorLevel: 'error' }
            }
        },
        librariestable: {
            render: component('./src/components/LibrariesTable.astro'),
            attributes: {
                library: { type: String, required: true, errorLevel: 'error', matches: ['Classic', 'Serverless', 'Tracing', 'Community', 'Log'] }
            }
        },
        uninstallagent: {
            render: component('./src/components/UninstallAgent.astro')
        },
        cswbillingnote: {
            render: component('./src/components/CSWBillingNote.astro')
        },
        alert: {
            render: component('./src/components/Alert.astro'),
            attributes: {
                type: { type: String, default: 'info', matches: ['info', 'warning', 'error', 'success'] }
            }
        }


    },
    nodes: {
        fence: {
            // Add custom Expressive Code component
            render: component('./src/components/CodeBlock.astro'),
            attributes: {
                ...starlightMarkdoc().nodes.fence.attributes,
                meta: { type: String, default: '' },
                title: { type: String, default: '' },
                disable_copy: { type: Boolean, default: false },
                wrap: { type: Boolean, default: false }
            }
        }
    },
    extends: [starlightMarkdoc()]
});