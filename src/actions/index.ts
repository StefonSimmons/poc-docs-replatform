import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Octokit } from "octokit";
import { getSecret } from 'astro:env/server'
import { ActionError } from 'astro:actions';

/**
 * This Actions directory is where you can define your server-side actions.
 * Actions are server-side functions that can be called from the client.
 * They can be used to handle form submissions, fetch data, or perform any server-side logic.
 */

const octokit = new Octokit({ 
  auth: getSecret('GITHUB_TOKEN')
});


export const server = {

    getRepoContent: defineAction({
        input: z.object({
            owner: z.string().describe('The name of the repository owner'),
            repo: z.string().describe('The name of the repository to fetch the content for'),
            path: z.string().describe('The path to fetch the content for')
        }),
        handler: async ({owner, repo, path}) => {
            try {
                const content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                    owner,
                    repo,
                    path,
                    headers: {
                        'Accept': 'application/vnd.github.object+json'
                    }
                })
                return content;
            } catch (error: any) {
                throw new ActionError({
                    code: error.status === 404 ? "NOT_FOUND" : "INTERNAL_SERVER_ERROR",
                    message: `No file found at ${error.request.url}`
                });
            }
        }
    })

}