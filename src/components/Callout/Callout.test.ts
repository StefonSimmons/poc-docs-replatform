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

    test("should render default learn callout with image", async () => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Callout, {
            props: {
                type: "learn",
            }
        });
        expect(result).toContain('alt="learning center"');
    });

    test('should render default CTA text when cta prop is not provided', async () => {
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
});