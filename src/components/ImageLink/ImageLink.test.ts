import { test, expect, describe, vi, beforeEach, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ImageLink from './ImageLink.astro';


describe('ImageLink', () => {
    test('should render ImageLink with props', async () => {
        const container = await AstroContainer.create();
        const props = {
            link: "https://example.com/adisk",
            name: "Adisk Integration",
            src: "../../assets/images/integrations_logos/adisk1.png",
            avatar: ""
        };
        
        const result = await container.renderToString(ImageLink, {
            props: props,
        });
        const srcName = props.src.split('/').pop();
        expect(result).toContain(srcName);
        expect(result).toContain(`${props.name} logo`);
        expect(result).toContain(props.link);
    });

    test('should throw error with correct message for non-existent image src', async () => {
        const container = await AstroContainer.create();
        const props = {
            link: "https://example.com",
            name: "Non-existent",
            src: "../../assets/images/integrations_logos/nonexistent.png",
            avatar: ""
        };
        
        await expect(
            container.renderToString(ImageLink, { props })
        ).rejects.toThrow('No image file found for path');
    });

});