import type { Loader, LoaderContext, LiveLoader } from "astro/loaders";
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
             *           object: { text: "" }
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
                    id: entry.name.replace('.md', ''),
                    data: {
                        name: entry.name,
                        // edge case for Jenkins.md. this should be handled in websites sources.
                        fm: fm.app_id ? fm : {
                            title: "Jenkins (Manual FM)",
                            description: "jenkins ManualFM Description",
                        },
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


export function remoteLiveLoader (config: Options): LiveLoader {
    return {
        name: 'remote-live-integrations',
        loadCollection: async () => {
            console.log("Loading Remote Live Integrations")
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
            try {
                const response: any = await getIntegrations(config);
                const entries = response.repository.object.entries;
                return {
                    entries: entries.map((entry:any) => {
                        const greyMatterData = greyMatter(entry.object.text)
                        const fm = greyMatterData.data
                        const content = marked.parse(greyMatterData.content)
                        return {
                            id: 'remote-live-integrations',
                            data: {
                                name: entry.name,
                                fm,
                                content
                            }
                        }
                    })
                }
            } catch (error:any) {
                console.error("LIVE ERROR:",error);
                return {
                    error: new Error(`FAILED on LIVE Content Collection: ${error.message}`)
                }
            }
        },
        loadEntry: async ({filter}:any) => {
            console.log("LOAD ENTRY",filter);
            const getOneIntegration = async (options: Options) => {
                const expression = `${options.branch}:${options.path}`;
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
                const variables = { owner: options.owner, repo: options.repo, expression: expression };
                const result = await octokit.graphql(query, variables);

                return result;
            }

            const updatedConfig = {
                ...config,
                path: `${config.path}/${filter.id}.md`
            }
            const response: any = await getOneIntegration(updatedConfig);

            const greyMatterData = greyMatter(response.repository.object.text)
            const fm = greyMatterData.data
            const content = marked.parse(greyMatterData.content)
            try {
                return {
                    id: 'remote-live-integrations',
                    data: {
                        name: fm.title,
                        fm,
                        content
                    }
                }
            } catch (error:any) {
                console.error("LIVE ERROR:",error);
                return {
                    error: new Error(`FAILED on Single LIVE Content Collection: ${error.message}`)
                }
            }
        }
    }
}