import Alert from '../components/Alert.astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, describe } from 'vitest';

describe('Alert', () => {
    test.for([
        {
            type: "info",
            message: "This is an alert message slotted into the alert component",
            expected: "alert-info after:content-[&#34;NOTE&#34;] after:text-blue-700  border-blue-700"
        },
        {
            type: "warning",
            message: "This is a warning alert message slotted into the alert component",
            expected: "alert-warning after:content-[&#34;WARNING&#34;] after:text-yellow-700  border-yellow-700"
        },
        {
            type: "error",
            message: "This is an error alert message slotted into the alert component",
            expected: "alert-error after:content-[&#34;ERROR&#34;] after:text-red-700  border-red-700"
        },
        {
            type: "success",
            message: "This is a success alert message slotted into the alert component",
            expected: "alert-success after:content-[&#34;SUCCESS&#34;] after:text-green-700  border-green-700"
        }
    ])('should render $type Alert component with correct message', async ({ type, message, expected }) => {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Alert, {
            props: {
                type: type
            },
            slots: {
                default: message
            }
        });
        expect(result).toContain(expected)
    });
})