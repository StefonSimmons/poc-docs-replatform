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


export const server = {

    getFileContent: defineAction({
        input: z.object({
            owner: z.string().optional().default("DataDog").describe('The name of the repository owner'),
            repo: z.string().optional().default("websites-sources").describe('The name of the repository to fetch the content for'),
            path: z.string().describe('The file path to fetch the content for')
        }),
        handler: async ({owner, repo, path}: {owner: string, repo: string, path: string}) => {
            const octokit = new Octokit({ 
                auth: getSecret('GITHUB_TOKEN')
            });
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
    }),
    /**
     * This action is used to fetch the content of a single file from a repository using the Github Graphql API.
     */
    getFileContentGQL: defineAction({
        input: z.object({
            owner: z.string().default("DataDog").describe('The name of the repository owner'),
            repo: z.string().default("websites-sources").describe('The name of the repository to fetch the content for'),
            branch: z.string().default("main").describe('The branch to fetch from'),
            path: z.string().describe('The file path to fetch the content for')
        }),
        handler: async ({ owner, branch, repo, path }: { owner: string, branch: string, repo: string, path: string }) => {
            const octokit = new Octokit({ 
                auth: getSecret('GITHUB_TOKEN')
            });
            try {
                const expression = `${branch}:${path}`;
                const query = `
                query ($owner: String!, $repo: String!, $expression: String!) {
                    repository(owner: $owner, name: $repo) {
                        object (expression: $expression){
                            ... on Blob {
                                text
                            }
                        }
                    }
                }
                `
                const variables = { owner, repo, expression };
                const result = await octokit.graphql(query, variables);
                return result;

            } catch (error:any) {
                throw new ActionError({
                    code: error.status === 404 ? "NOT_FOUND" : "INTERNAL_SERVER_ERROR",
                    message: `No file found at ${error.request.url}`
                });
            }
        }
    }),
    /**
     * This action is used to fetch a content list from websites-sources using Github Graphql API.
     * This is an Object oriented approach to fetching data that specifies what information is fetched. thus, lessening the number of requests on one page.
     * Note: I used the GraphQL Explorer (a browser-based developer environment) to help with defining the query https://docs.github.com/en/graphql/overview/explorer
     */
    getRepoContentGQL: defineAction({
        input: z.object({
            owner: z.string().default("DataDog").describe('The name of the repository owner'),
            repo: z.string().default("websites-sources").describe('The name of the repository to fetch the content for'),
            branch: z.string().default('main').describe('The branch to fetch from'),
            path: z.string().describe('The directory path to fetch the content for')
        }),
        handler: async ({ owner, repo, path, branch }: { owner: string, repo: string, path: string, branch: string }) => {
            const octokit = new Octokit({ 
                auth: getSecret('GITHUB_TOKEN')
            });
            const expression = `${branch}:${path}`;
            const query = `
            query ($owner: String!, $repo: String!, $expression: String!) {
                repository(owner: $owner, name: $repo) {
                    object (expression: $expression){
                        ... on Tree {
                            entries{
                                name,
                                object {
                                    ... on Blob {
                                        text
                                    }
                                }
                            }
                        }
                    }
                }
            }
            `
          const variables = { owner, repo, expression };
          const result = await octokit.graphql(query, variables);
          return result;
        }
      })

}