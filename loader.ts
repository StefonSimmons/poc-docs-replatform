import type { Loader, LoaderContext } from "astro/loaders";
import { Octokit } from "octokit";
import { getSecret } from 'astro:env/server'
import greyMatter from 'gray-matter'
import { marked } from "marked";

const octokit = new Octokit({ 
    auth: getSecret('GITHUB_TOKEN')
});

type Options = {owner:string, repo:string, path:string, branch:string}

export function remoteLoader(options: Options): Loader {
    return {
        name: "remote-loader",
        load: async ({ collection, store, logger, parseData, generateDigest }: LoaderContext) => {
            logger.info("Loading Remote Integrations");
            /**
             * This function fetches the integrations data via the Github GraphQL API. 
             * @param options 
             * @returns an object in the same shape as it's query.
             * @example
             * {
             *   repository: {
             *     object: {
             *       entries: [
             *         {
             *           name: 'ably.md',
             *           object: { text: ""}
             *         }
             *         ...
             *       ]
             *     }
             *   }
             * }
             */
            const getIntegrations = async (options: Options) => {
                const expression = `${options.branch}:${options.path}`;
                const query = `
                query ($owner: String!, $repo: String!, $expression: String!) {
                    repository (owner: $owner, name: $repo) {
                        object (expression: $expression) {
                            ... on Tree {
                                entries {
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
                const variables = { owner: options.owner, repo: options.repo, expression: expression };
                const result = await octokit.graphql(query, variables);
                return result;
            }  

            const response: any = await getIntegrations(options);
            const entries = response.repository.object.entries;


            store.clear();            

            for (const entry of entries) {
                const greyMatterData = greyMatter(entry.object.text)
                const fm = greyMatterData.data
                const content = marked.parse(greyMatterData.content)

                // validates the data against the schema.
                const data = await parseData({
                    id: collection,
                    data: {
                        name: entry.name,
                        fm,
                        content
                    }
                });
                
                // used to generate a digest of the content which helps with invalidating the cache
                const contentDigest = generateDigest(entry);
                
                // store the data in the store.
                store.set({
                    id: entry.name.replace('.md', ''),
                    data,
                    digest: contentDigest,
                });
            }
        }, 
    };
}