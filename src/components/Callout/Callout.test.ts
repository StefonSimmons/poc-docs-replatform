import Callout from './Callout.astro';
import { test, expect, describe } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

describe('Callout', () => {
    test.for([
        {
            type: "learn",
            expectedCalloutStyles: "bg-ddpurple-light border-ddpurple rounded-xl",
            expectedAnchorStyles: "bg-ddpurple !text-white px-3 py-[10px] uppercase min-w-[138px]",
            expectedImageAlt: 'alt="learning center"'
        },
        {
            type: "default",
            expectedCalloutStyles: "bg-white border-gray-200 rounded-sm",
            expectedAnchorStyles: "bg-white !text-ddpurple px-3 py-[10px] hover:bg-ddpurple hover:!text-white"
        }
    ])('should render $type Callout component with correct styles', async ({ type, expectedCalloutStyles, expectedAnchorStyles, expectedImageAlt }) => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Callout, {
            props: {
                type: type,
                url: "https://example.com"
            }
        });
        expect(result).toContain(expectedCalloutStyles);
        expect(result).toContain(expectedAnchorStyles);
        expect(result).toContain(expectedImageAlt);
    });

    test("should render 'default' learn Callout with image", async () => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Callout, {
            props: {
                type: "learn",
            }
        });
        expect(result).toContain('alt="learning center"');
    });

    test("should render 'learn' Callout without image or CTA text", async () => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Callout, {
            props: {
                type: "learn",
                hide_img: true
            }
        });
        expect(result).not.toContain('alt="learning center"');
        expect(result).not.toContain("href=");
    });

    test('should render "default" Callout with default CTA text when cta prop is not provided', async () => {
        const container = await AstroContainer.create();
        const customCTA = "Request Access";
        const result = await container.renderToString(Callout, {
            props: {
                url: "https://example.com",
            }
        });
        expect(result).toContain(customCTA);
        expect(result).not.toContain("Sign up");
    });

    test('should render "default" Callout with custom CTA text when provided', async () => {
        const container = await AstroContainer.create();
        const customCTA = "Go to School";
        const result = await container.renderToString(Callout, {
            props: {
                url: "https://example.com",
                cta: customCTA
            }
        });
        expect(result).toContain(customCTA);
    });

    test("should render slotted content", async () => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Callout, {
            slots: {
                default: "This is a test slotted content"
            }
        });
        expect(result).toContain("This is a test slotted content");
    });

    test('should render complete "learn" Callout with all props', async () => {
        const container = await AstroContainer.create();
        const props = {
            type: "learn",
            url: "https://example.com/signup",
            header: "Learn More About Our Product",
            cta: "Start Learning",
            hide_img: false,
            custom_class: "test-class"
        };
        const slotContent = "Discover amazing features and capabilities.";
        
        const result = await container.renderToString(Callout, {
            props: props,
            slots: {
                default: slotContent
            }
        });
        
        expect(result).toContain(props.header);
        expect(result).toContain(props.url);
        expect(result).toContain(props.cta);
        expect(result).toContain(props.custom_class);
        expect(result).toContain(slotContent);
        expect(result).toContain('learning center');
    });
});